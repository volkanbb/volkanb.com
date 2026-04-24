import os
from app import create_app, db
from app.models.user import User
from app.models.service import Service
from app.models.timeslot import TimeSlot
from app.models.log import Log
from app.models.business import Business
from datetime import datetime, timedelta
import random

def seed():
    # Create tables if not exist
    print("Creating tables...")
    db.create_all()

    # Check if data already exists
    try:
        if User.query.first():
            print("Database already contains data. Skipping seed.")
            return
    except Exception:
        # If query fails, we assume tables were just created and proceed to seed
        pass

    print("Seeding database...")

    # 1. Create Admins
    admin = User(name="System Admin", email="admin@test.com", role="admin")
    admin.set_password("admin123")
    db.session.add(admin)

    # 2. Create Users
    print("Creating 100 users...")
    users = []
    for i in range(1, 101):
        u = User(name=f"Müşteri {i}", email=f"user{i}@test.com", role="customer")
        u.set_password("password123")
        users.append(u)
        db.session.add(u)
    db.session.commit()

    # 3. Create Businesses (Hotels & Salons)
    hotels = [
        Business(name="Marmaris Sky Resort", type="hotel", description="Deniz manzaralı huzurlu bir tatil.", address="Marmaris, Muğla"),
        Business(name="İstanbul Elite Palace", type="hotel", description="Boğaz'ın kalbinde lüks konaklama.", address="Beşiktaş, İstanbul"),
        Business(name="Antalya Sunset Hotel", type="hotel", description="Her şey dahil yaz eğlencesi.", address="Lara, Antalya")
    ]
    salons = [
        Business(name="Makas Premium Salon", type="salon", description="Profesyonel saç tasarımı.", address="Nişantaşı, İstanbul")
    ]
    legacy_business = Business(name="Global Hizmetler A.Ş.", type="salon", description="Genel randevu hizmetleri.", address="Merkez")
    
    all_businesses = hotels + salons + [legacy_business]
    for b in all_businesses:
        db.session.add(b)
    db.session.commit()

    # 4. Create Services
    print("Creating hotel rooms and appointment services...")
    
    # Rooms (Hotels)
    room_types = ["Standart", "Lüks", "Kral Süit"]
    for hotel in hotels:
        for r_num in range(101, 106): # 5 rooms per hotel
            r_type = random.choice(room_types)
            s = Service(
                business_id=hotel.id,
                name=f"{r_type} Oda {r_num}",
                description=f"{r_type} özellikli konforlu oda.",
                category="hotel",
                room_number=str(r_num),
                room_type=r_type,
                image_url=f"https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=600"
            )
            db.session.add(s)

    # Hybrid/Appointment Services
    legacy_service_names = [
        "Saç Kesimi", "Sakal Tıraşı", "Cilt Bakımı", "Masaj", "Spa", 
        "Manikür", "Pedikür", "Yoga Seansı", "Fitness Danışmanlığı", "Diş Kontrolü",
        "Hukuki Danışmanlık", "Özel Ders", "Ev Temizliği", "Tamirat", "Tesisat Kontrol",
        "Elektrik Arıza", "Bahçe Bakımı", "Nakliye Değerleme", "Boya Badana", "Genel Danışmanlık"
    ]
    
    appointment_services = []
    for name in legacy_service_names:
        s = Service(
            business_id=random.choice(salons + [legacy_business]).id,
            name=name,
            description=f"{name} için profesyonel hizmet.",
            duration=random.choice([30, 45, 60, 90]),
            category="appointment",
            image_url="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=600"
        )
        db.session.add(s)
        appointment_services.append(s)
    
    db.session.commit()

    # 5. Create TimeSlots
    print("Generating slots for appointment services...")
    start_date = datetime.now()
    for svc in appointment_services:
        for d in range(10): # 10 days for each service
            date = start_date + timedelta(days=d)
            for hour in range(9, 17): # 8 slots per day
                ts = TimeSlot(
                    service_id=svc.id,
                    date=date.date(),
                    start_time=datetime.strptime(f"{hour}:00", "%H:%M").time(),
                    end_time=datetime.strptime(f"{hour}:59", "%H:%M").time(),
                    is_available=True
                )
                db.session.add(ts)
    db.session.commit()

    # 6. Generate Logs
    print("Generating logs...")
    actions = ["REGISTER", "LOGIN", "CREATE_RESERVATION", "UPDATE_SERVICE", "CANCEL_RESERVATION", "DELETE_SERVICE"]
    for i in range(1000):
        l = Log(
            user_id=random.choice([admin.id] + [u.id for u in users]),
            action=random.choice(actions),
            affected_record_id=random.randint(1, 100),
            timestamp=datetime.now() - timedelta(minutes=random.randint(0, 10000))
        )
        db.session.add(l)
    db.session.commit()

    print(f"Restoration complete!")

if __name__ == "__main__":
    app = create_app()
    with app.app_context():
        seed()
