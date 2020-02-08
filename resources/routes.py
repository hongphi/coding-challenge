from .auth import SignupApi, LoginApi, MeApi
from .reset_password import ResetPassword, ForgotPassword


def initialize_routes(api):
    api.add_resource(SignupApi, '/sign-up')
    api.add_resource(LoginApi, '/login')
    api.add_resource(MeApi, '/me')
    api.add_resource(ForgotPassword, '/forgot-password')
    api.add_resource(ResetPassword, '/reset-password')
