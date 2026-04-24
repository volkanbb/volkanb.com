from app.models.timeslot import TimeSlot
from app import db
from app.utils.logging_helper import log_action
from datetime import datetime

class SlotService:
    @staticmethod
    def create_slot(service_id, date, start_time, end_time, admin_id):
        slot = TimeSlot(
            service_id=service_id,
            date=date,
            start_time=start_time,
            end_time=end_time,
            is_available=True
        )
        db.session.add(slot)
        db.session.commit()
        log_action(admin_id, f"CREATE_SLOT: Slot created for service {service_id}", slot.id)
        return slot

    @staticmethod
    def get_available_slots(service_id, date=None):
        query = TimeSlot.query.filter_by(service_id=service_id, is_available=True)
        if date:
            query = query.filter_by(date=date)
        return query.all()

    @staticmethod
    def delete_slot(slot_id, admin_id):
        slot = TimeSlot.query.get(slot_id)
        if not slot:
            return False
        db.session.delete(slot)
        db.session.commit()
        log_action(admin_id, f"DELETE_SLOT: Slot {slot_id} deleted", slot_id)
        return True
