from flask import Flask
from flask_bcrypt import Bcrypt
from flask_mail import Mail
from flask_restful import Api, Resource
from flask_wtf import CSRFProtect
from flask_cors import CORS

from database.db import initialize_db
from flask_jwt_extended import JWTManager
from resources.errors import errors

app = Flask(__name__)

csrf_protect = CSRFProtect(app)

app.config.from_envvar('ENV_FILE_LOCATION')
mail = Mail(app)

from resources.routes import initialize_routes
api = Api(app, decorators=[csrf_protect.exempt], errors=errors)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

CORS(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/sample_db'
}
app.config['SECRET_KEY'] = 't1NP63m4wnBg6nyHYKfmc2TpCOGI4nss'
app.config['WTF_CSRF_ENABLED'] = False

initialize_db(app)
initialize_routes(api)

@app.route('/')
def hello_world():
    return 'Hello World!'
