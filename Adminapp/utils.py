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

def change_profile(request,id):    
    user_first_name=request.data.get("first_name")
    user_last_name=request.data.get("last_name")
    user_email=request.data.get("email")

    User.objects.filter(id=id).update(first_name=user_first_name,last_name=user_last_name,email=user_email)
    return "updated breweries"    


def changelistshow_status(request,id):
    listshow_status=request.data.get("listshow")
    User.objects.filter(id=id).update(listshow=listshow_status)
    return "List Show Status Changed"


def changelistexport_status(request,id):
    listexport_status=request.data.get("listexport")
    User.objects.filter(id=id).update(listexport=listexport_status)
    return "List Export Status Changed"    
