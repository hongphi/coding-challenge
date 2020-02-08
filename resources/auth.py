import datetime
import json

from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
from flask_restful import Resource
from flask import request, Response, render_template
from jwt import ExpiredSignatureError
from mongoengine import DoesNotExist
from werkzeug.datastructures import MultiDict

from database.models import User, RegisterForm


class SignupApi(Resource):
    def post(self):
        body = MultiDict(request.get_json())
        form = RegisterForm(body)
        if User.objects.filter(email=body.get("email")).count() > 0:
            return {
                'email': ["This email already exists"]
            }, 400
        if form.validate():
            user = User(**body)
            user.hash_password()
            user.save()
            expires = datetime.timedelta(minutes=20)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {"user": json.loads(user.to_json()), "access_token": access_token}, 200
        else:
            return form.errors, 400


class LoginApi(Resource):
    def post(self):
        body = request.get_json()
        try:
            user = User.objects.get(email=body.get('email'))
            authorized = user.check_password(body.get('password'))
            if not authorized:
                return {'error': 'Email or password invalid'}, 401

            expires = datetime.timedelta(minutes=20)
            access_token = create_access_token(identity=str(user.id), expires_delta=expires)
            return {'token': access_token, "user": json.loads(user.to_json())}, 200
        except DoesNotExist:
            return {'error': 'Email or password invalid'}, 401


class MeApi(Resource):
    @jwt_required
    def get(self):
        user_id = get_jwt_identity()
        user = User.objects.get(id=user_id)
        return {"user": json.loads(user.to_json()),}, 200


