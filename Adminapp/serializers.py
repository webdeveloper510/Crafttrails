from Adminapp.models import *
from rest_framework import serializers
from Craftapp.models import *



class UserListSerializers(serializers.ModelSerializer):
    class Meta:
        model=User
        fields="__all__"