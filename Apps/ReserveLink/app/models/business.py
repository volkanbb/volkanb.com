from app import db

class Business(db.Model):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    type = db.Column(db.String(50), default='hotel') # hotel, salon, spa
    image_url = db.Column(db.String(500), nullable=True)
    address = db.Column(db.String(255), nullable=True)

    services = db.relationship('Service', backref='business', lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "type": self.type,
            "image_url": self.image_url,
            "address": self.address
        }
