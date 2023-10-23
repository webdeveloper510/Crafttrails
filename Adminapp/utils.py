from Craftapp.models import *




def user_list(request):
    user_data=User.objects.filter(is_superuser=0).values().order_by("id")
    return user_data


def change_status(request):
    user_status=request.data.get("status")
    User.objects.filter(id=id).update(status=1)
    return "Status Changed"