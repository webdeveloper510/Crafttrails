from rest_framework import serializers
from Craftapp.models import *
from django.contrib.auth.hashers import make_password

class RegisterSerializer(serializers.ModelSerializer):



    def create(self, validated_data):
        
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)       
        return super(RegisterSerializer, self).create(validated_data) 
    
    class Meta:
        model=User
        fields=["id","first_name","last_name","password","brewery","email"]
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'password': {'required': True},
            'brewery': {'required': True},
            'email': {'required': True},
        }


    def validate_password(self,password):
        if len(password)< 8:
            raise serializers.ValidationError("Password must be more than 8 character.")
        if not any(char.isdigit() for char in password):
            raise serializers.ValidationError('Password must contain at least one digit.')
        return password
