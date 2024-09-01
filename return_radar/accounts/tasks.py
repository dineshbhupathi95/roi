from celery import shared_task
from django.core.mail import send_mail
from django_otp.plugins.otp_email.models import EmailDevice

@shared_task
def send_otp(email):
    device = EmailDevice.objects.filter(email=email).first()
    if not device:
        device = EmailDevice.objects.create(email=email, confirmed=True)
    device.generate_token()
    device.save()
    send_mail(
        'Your OTP Code',
        f'Your OTP code is {device.token}.',
        'your-email@example.com',
        [email],
        fail_silently=False,
    )
