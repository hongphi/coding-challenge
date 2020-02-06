from .auth import SignupApi, LoginApi


def initialize_routes(api):
    api.add_resource(SignupApi, '/signup')
    api.add_resource(LoginApi, '/login')
