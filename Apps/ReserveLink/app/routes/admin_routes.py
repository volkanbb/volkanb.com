from flask import Blueprint, request, jsonify, url_for
import os
import uuid
from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app.services.service_manager import ServiceManager
from app.services.slot_service import SlotService
from app.services.reservation_service import ReservationService
from app.services.log_service import LogService
from app.services.user_service import UserService
from app import db
from app.models.business import Business

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/businesses', methods=['GET', 'POST'])
@jwt_required()
def manage_businesses():
    claims = get_jwt()
    user_id = get_jwt_identity()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    if request.method == 'GET':
        page = request.args.get('page', 1, type=int)
        businesses = ServiceManager.get_all_businesses(page=page)
        return jsonify({
            "businesses": [b.to_dict() for b in businesses.items],
            "total": businesses.total,
            "pages": businesses.pages
        })

    if request.method == 'POST':
        data = request.json
        business = Business(
            name=data.get('name'),
            description=data.get('description'),
            type=data.get('type', 'hotel'),
            image_url=data.get('image_url'),
            address=data.get('address')
        )
        db.session.add(business)
        db.session.commit()
        return jsonify(business.to_dict()), 201

@admin_bp.route('/businesses/<int:business_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def update_delete_business(business_id):
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
        
    business = Business.query.get(business_id)
    if not business:
        return jsonify({"msg": "Hizmet bulunamadı"}), 404
        
    if request.method == 'PUT':
        data = request.json
        business.name = data.get('name', business.name)
        business.description = data.get('description', business.description)
        business.type = data.get('type', business.type)
        business.image_url = data.get('image_url', business.image_url)
        business.address = data.get('address', business.address)
        db.session.commit()
        return jsonify(business.to_dict())
        
    if request.method == 'DELETE':
        # Optional: Handle services removal logic if needed, 
        # but let's just delete the business (cascading depends on DB schema/models)
        db.session.delete(business)
        db.session.commit()
        return jsonify({"msg": "İşletme silindi"})

@admin_bp.route('/services', methods=['POST'])
@jwt_required()
def create_service():
    claims = get_jwt()
    user_id = get_jwt_identity()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    data = request.json
    biz_id = data.get('business_id')
    try:
        if biz_id == "" or biz_id is None:
            biz_id = None
        else:
            biz_id = int(biz_id)
    except (ValueError, TypeError):
        biz_id = None

    service_data = {
        "name": data.get('name'),
        "description": data.get('description'),
        "duration": data.get('duration', 60),
        "image_url": data.get('image_url'),
        "business_id": biz_id,
        "category": data.get('category', 'hotel'),
        "room_number": data.get('room_number'),
        "room_type": data.get('room_type')
    }

    if not service_data["name"]:
        return jsonify({"msg": "İsim gereklidir"}), 400

    from app.models.service import Service
    service = Service(**service_data)
    db.session.add(service)
    db.session.commit()
    
    from app.utils.logging_helper import log_action
    log_action(user_id, f"CREATE_SERVICE: {service.name}", service.id)
    
    return jsonify(service.to_dict()), 201

@admin_bp.route('/services/<int:service_id>', methods=['PUT', 'DELETE'])
@jwt_required()
def manage_service(service_id):
    claims = get_jwt()
    user_id = get_jwt_identity()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403

    from app.models.service import Service
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"msg": "Not found"}), 404

    if request.method == 'PUT':
        data = request.json
        service.name = data.get('name', service.name)
        service.description = data.get('description', service.description)
        service.duration = data.get('duration', service.duration)
        service.image_url = data.get('image_url', service.image_url)
        service.business_id = data.get('business_id', service.business_id)
        service.category = data.get('category', service.category)
        service.room_number = data.get('room_number', service.room_number)
        service.room_type = data.get('room_type', service.room_type)
        
        db.session.commit()
        return jsonify(service.to_dict())
    
    if request.method == 'DELETE':
        db.session.delete(service)
        db.session.commit()
        return jsonify({"msg": "Deleted"})

@admin_bp.route('/slots', methods=['POST'])
@jwt_required()
def create_slot():
    claims = get_jwt()
    user_id = get_jwt_identity()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    data = request.json
    slot = SlotService.create_slot(
        data.get('service_id'),
        data.get('date'),
        data.get('start_time'),
        data.get('end_time'),
        user_id
    )
    return jsonify(slot.to_dict()), 201

@admin_bp.route('/services/<int:service_id>/generate-slots', methods=['POST'])
@jwt_required()
def generate_slots(service_id):
    claims = get_jwt()
    user_id = get_jwt_identity()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    from app.models.service import Service
    from datetime import datetime, timedelta
    service = Service.query.get(service_id)
    if not service:
        return jsonify({"msg": "Hizmet bulunamadı"}), 404
        
    start_date = datetime.now().date()
    for d in range(7):
        current_date = start_date + timedelta(days=d)
        for hour in range(9, 17): # 09:00 to 17:00
            SlotService.create_slot(
                service_id,
                current_date.isoformat(),
                f"{hour:02}:00",
                f"{hour:02}:59",
                user_id
            )
    
    return jsonify({"msg": "7 günlük müsaitlik başarıyla oluşturuldu"}), 201

@admin_bp.route('/reservations', methods=['GET'])
@jwt_required()
def list_reservations():
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    page = request.args.get('page', 1, type=int)
    reservations = ReservationService.get_all_reservations(page=page)
    return jsonify({
        "reservations": [r.to_dict() for r in reservations.items],
        "total": reservations.total,
        "pages": reservations.pages
    })

@admin_bp.route('/reservations/<int:res_id>/status', methods=['POST'])
@jwt_required()
def manage_reservation(res_id):
    claims = get_jwt()
    user_id = get_jwt_identity()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    data = request.json
    reservation, error = ReservationService.update_reservation_status(res_id, data.get('status'), user_id)
    if error:
        return jsonify({"msg": error}), 400
    return jsonify(reservation.to_dict())

@admin_bp.route('/reservations/<int:res_id>', methods=['DELETE'])
@jwt_required()
def delete_reservation(res_id):
    claims = get_jwt()
    user_id = get_jwt_identity()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    success, error = ReservationService.delete_reservation(res_id, user_id, is_admin=True)
    if not success:
        return jsonify({"msg": error}), 400
    return jsonify({"msg": "Deleted"}), 200

@admin_bp.route('/logs', methods=['GET'])
@jwt_required()
def view_logs():
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', None)
    logs = LogService.advanced_search(search, page=page)
    
    return jsonify({
        "logs": [l.to_dict() for l in logs.items],
        "total": logs.total,
        "pages": logs.pages
    })

@admin_bp.route('/users', methods=['GET'])
@jwt_required()
def list_users():
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    page = request.args.get('page', 1, type=int)
    users = UserService.get_all_users(page=page)
    return jsonify({
        "users": [u.to_dict() for u in users.items],
        "total": users.total,
        "pages": users.pages
    })

@admin_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_image():
    claims = get_jwt()
    if claims.get('role') != 'admin':
        return jsonify({"msg": "Admin access required"}), 403
    
    if 'file' not in request.files:
        return jsonify({"msg": "No file part"}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({"msg": "No selected file"}), 400
    
    if file:
        filename = secure_filename(file.filename)
        # Add random suffix to avoid collisions
        ext = os.path.splitext(filename)[1]
        unique_filename = f"{uuid.uuid4().hex}{ext}"
        
        # Ensure path exists
        upload_dir = os.path.join('app', 'static', 'uploads')
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
            
        file_path = os.path.join(upload_dir, unique_filename)
        file.save(file_path)
        
        # Return the public URL
        url = f"/static/uploads/{unique_filename}"
        return jsonify({"url": url}), 200
