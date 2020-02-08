import datetime

from flask import request, render_template
from flask_jwt_extended import create_access_token, decode_token
from flask_restful import Resource
from jwt import ExpiredSignatureError, InvalidTokenError, DecodeError

from database.models import User
from resources.errors import SchemaValidationError, EmailDoesNotExistsError, InternalServerError, BadTokenError, \
    ExpiredTokenError
from services.mail_service import send_email


class ForgotPassword(Resource):
    def post(self):
        url = 'http://127.0.0.1:3000/reset/'
        try:
            body = request.get_json()
            email = body.get('email')
            if not email:
                raise SchemaValidationError
            try:
                user = User.objects.get(email=email)
            except:
                user = None

            if not user:
                raise EmailDoesNotExistsError

            expires = datetime.timedelta(hours=24)
            reset_token = create_access_token(str(user.id), expires_delta=expires)

            return send_email('[Demo] Reset Your Password',
                              sender='demo@demo.com',
                              recipients=[user.email],
                              text_body=render_template('email/reset_password.txt',
                                                        url=url + reset_token),
                              html_body=render_template('email/reset_password.html',
                                                        url=url + reset_token))
        except SchemaValidationError:
            raise SchemaValidationError
        except EmailDoesNotExistsError:
            raise EmailDoesNotExistsError
        except Exception as e:
            raise InternalServerError


class ResetPassword(Resource):
    def post(self):
        try:
            body = request.get_json()
            reset_token = body.get('reset_token')
            password = body.get('password')

            if not reset_token or not password:
                raise SchemaValidationError

            user_id = decode_token(reset_token)['identity']

            user = User.objects.get(id=user_id)

            user.modify(password=password)
            user.hash_password()
            user.save()

            return send_email('[Demo] Password reset successful',
                              sender='demo@demo.com',
                              recipients=[user.email],
                              text_body='Password reset was successful',
                              html_body='<p>Password reset was successful</p>')

        except SchemaValidationError:
            raise SchemaValidationError
        except ExpiredSignatureError:
            raise ExpiredTokenError
        except (DecodeError, InvalidTokenError):
            raise BadTokenError
        except Exception as e:
            raise InternalServerError
