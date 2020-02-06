from flask_bcrypt import generate_password_hash, check_password_hash
from flask_mongoengine.wtf import model_form

from .db import db

import mongoengine as mongo

GENDER_CHOICES = (
    ('0', 'Male'),
    ('1', 'Female'),
)


# email, name, age, gender(0/1), image
class User(db.Document):
    email = db.EmailField(required=True, unique=True)
    password = db.StringField(required=True, min_length=6)
    name = db.StringField(required=True)
    age = db.IntField(required=True)
    gender = db.StringField(max_length=1, choices=GENDER_CHOICES, required=True)
    image = mongo.URLField()

    def hash_password(self):
        # Encrypt password
        self.password = generate_password_hash(self.password).decode('utf8')

    def check_password(self, password):
        # Check password
        return check_password_hash(self.password, password)


RegisterForm = model_form(User, exclude=['password', 'image'])