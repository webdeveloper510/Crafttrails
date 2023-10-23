from Adminapp.models import *
from rest_framework import serializers
from Craftapp.models import *



class UserListSerializers(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=["id","is_superuser","first_name","last_name","email","brewery","status"]