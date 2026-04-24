from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.service_manager import ServiceManager
from app.services.slot_service import SlotService
from app.services.reservation_service import ReservationService
from app.models.reservation import Reservation

customer_bp = Blueprint('customer', __name__)

@customer_bp.route('/hotels', methods=['GET'])
def list_hotels():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', None)
    businesses = ServiceManager.get_all_businesses(page=page, search_query=search)
    return jsonify({
        "businesses": [b.to_dict() for b in businesses.items],
        "total": businesses.total,
        "pages": businesses.pages
    })

@customer_bp.route('/hotels/<int:hotel_id>/rooms', methods=['GET'])
def list_hotel_rooms(hotel_id):
    page = request.args.get('page', 1, type=int)
    rooms = ServiceManager.get_all_services(page=page, business_id=hotel_id)
    return jsonify({
        "rooms": [r.to_dict() for r in rooms.items],
        "total": rooms.total,
        "pages": rooms.pages
    })

@customer_bp.route('/services/<int:service_id>', methods=['GET'])
def get_service_detail(service_id):
    from app.models.service import Service
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"msg": "Hizmet bulunamadı"}), 404
    return jsonify(service.to_dict())

@customer_bp.route('/services', methods=['GET'])
def list_services():
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', None)
    category = request.args.get('category', None)
    services = ServiceManager.get_all_services(page=page, search_query=search, category=category)
    return jsonify({
        "services": [s.to_dict() for s in services.items],
        "total": services.total,
        "pages": services.pages
    })

@customer_bp.route('/services/<int:service_id>/availability', methods=['GET'])
def get_availability(service_id):
    from app.models.service import Service
    from app.models.timeslot import TimeSlot
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"msg": "Not found"}), 404
        
    if service.category == 'hotel':
        # Return date ranges
        bookings = Reservation.query.filter(
            Reservation.service_id == service_id,
            Reservation.status.in_(['approved', 'pending'])
        ).all()
        return jsonify({
            "type": "hotel",
            "booked_ranges": [{"check_in": b.check_in_date.isoformat(), "check_out": b.check_out_date.isoformat()} for b in bookings]
        })
    else:
        # Return available slots
        date = request.args.get('date', None)
        slots = SlotService.get_available_slots(service_id, date)
        return jsonify({
            "type": "appointment",
            "slots": [s.to_dict() for s in slots]
        })

@customer_bp.route('/reservations', methods=['POST'])
@jwt_required()
def create_reservation():
    user_id = get_jwt_identity()
    data = request.json
    service_id = data.get('service_id')

    reservation, error = ReservationService.create_reservation(user_id, service_id, data)
    if error:
        return jsonify({"msg": error}), 400

    return jsonify({"msg": "Rezervasyon oluşturuldu", "reservation": reservation.to_dict()}), 201

@customer_bp.route('/reservations', methods=['GET'])
@jwt_required()
def my_reservations():
    user_id = get_jwt_identity()
    page = request.args.get('page', 1, type=int)
    reservations = ReservationService.get_user_reservations(user_id, page=page)
    return jsonify({
        "reservations": [r.to_dict() for r in reservations.items],
        "total": reservations.total,
        "pages": reservations.pages
    })

@customer_bp.route('/reservations/<int:res_id>/cancel', methods=['POST'])
@jwt_required()
def cancel_reservation(res_id):
    user_id = get_jwt_identity()
    success, error = ReservationService.delete_reservation(res_id, user_id)
    if not success:
        return jsonify({"msg": error}), 400
    return jsonify({"msg": "Rezervasyon iptal edildi"}), 200
