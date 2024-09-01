from django.urls import path
from .views import *

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('users/', UserList.as_view(), name='users'),

]
