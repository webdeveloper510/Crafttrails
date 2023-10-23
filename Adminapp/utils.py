from Craftapp.models import *
from Adminapp.serializers import *




def user_list(request):
    user_data=User.objects.filter(is_superuser=0).values().order_by("id")
    serializers=UserListSerializers(user_data,many=True)
    return serializers


def change_status(request,id):
    user_status=request.data.get("status")
    User.objects.filter(id=id).update(status=1)
    return "Status Changed"