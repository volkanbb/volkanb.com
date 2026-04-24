from app import db

class Service(db.Model):
    __tablename__ = 'services'

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey('businesses.id'), nullable=True) # Linked to a Hotel
    name = db.Column(db.String(100), nullable=False) # e.g. "Deluxe Double Room"
    description = db.Column(db.Text, nullable=True)
    duration = db.Column(db.Integer, nullable=False, default=60) # Minutes (useful for appointments)
    category = db.Column(db.String(20), default='hotel') # hotel, appointment
    image_url = db.Column(db.String(500), nullable=True)
    
    # Advanced Hotel Management Fields
    room_number = db.Column(db.String(20), nullable=True) # e.g. "101", "204"
    room_type = db.Column(db.String(50), nullable=True) # e.g. "Kral Süit", "Standart"

    def to_dict(self):
        return {
            "id": self.id,
            "business_id": self.business_id,
            "name": self.name,
            "description": self.description,
            "duration": self.duration,
            "category": self.category,
            "room_number": self.room_number,
            "room_type": self.room_type,
            "image_url": self.image_url
        }
