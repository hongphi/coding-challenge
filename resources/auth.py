import datetime

from flask_jwt_extended import create_access_token
from flask_restful import Resource
from flask import request

from database.models import User, RegisterForm


class SignupApi(Resource):
    def post(self):
        body = request.get_json()
        form = RegisterForm(**body)
        if form.validate():
            user = User(**body)
            user.hash_password()
            user.save()
            id = user.id
            return {'id': str(id)}, 200
        else:
            return form.errors, 400

    def get(self):
        return "AAAA", 200


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        user = User.objects.get(email=body.get('email'))
        authorized = user.check_password(body.get('password'))
        if not authorized:
            return {'error': 'Email or password invalid'}, 401

        expires = datetime.timedelta(minutes=20)
        access_token = create_access_token(identity=str(user.id), expires_delta=expires)
        return {'token': access_token}, 200
