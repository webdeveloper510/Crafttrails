from Craftapp.models import *




def user_list(request):
    user_data=User.objects.filter(is_superuser=0).values().order_by("id")
    return user_data