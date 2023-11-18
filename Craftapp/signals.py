from django.core.mail import EmailMultiAlternatives
from django.dispatch import receiver
from django.template.loader import render_to_string
from django.urls import reverse
from CraftTrails import settings
from django_rest_passwordreset.signals import reset_password_token_created


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):
    
    val2=instance.request.build_absolute_uri(reverse('password_reset:reset-password-confirm'))
   
    val=reset_password_token.key
    main_value="https://api1.cctrails.com/#/auth/reset-password/?token="+reset_password_token.key
   
    context = {
        'current_user': reset_password_token.user,
        'username': reset_password_token.user.first_name,
        'email': reset_password_token.user.email,
        'reset_password_url':main_value,
    }
    
    email_html_message = render_to_string('emails/password_reset_email.html', context)
    email_plaintext_message = render_to_string('emails/password_reset_email.txt', context)

    msg = EmailMultiAlternatives(
        
        "Password Reset for {title}".format(title="Your Website Title"),
       
        email_plaintext_message,
      
        settings.EMAIL_HOST_USER,
       
        [reset_password_token.user.email]
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
