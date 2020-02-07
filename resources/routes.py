from .auth import SignupApi, LoginApi


def initialize_routes(api):
    api.add_resource(SignupApi, '/sign-up')
    api.add_resource(LoginApi, '/login')
