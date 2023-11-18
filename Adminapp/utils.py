from Craftapp.models import *
from Adminapp.serializers import *




def user_list(request):
    user_data=User.objects.filter(is_superuser=0).values().order_by("id")
    serializers=UserListSerializers(user_data,many=True)
    return serializers


def change_status(request,id):
    user_status=request.data.get("status")
    User.objects.filter(id=id).update(status=user_status)
    return "Status Changed"

def user_edit(request,id):    
    user_data=User.objects.filter(id=id)
    if user_data:
        user_data=User.objects.get(id=id)
        data={"location":user_data.brewery}
    return data   

def change_location(request,id):    
    user_location=request.data.get("location")
    User.objects.filter(id=id).update(brewery=user_location)
    return "updated breweries"