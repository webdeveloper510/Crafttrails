from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from Craftapp.serializers import *
from rest_framework import status
from django.contrib.auth import authenticate, login,logout
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


# Create your views here.
"""API for User Signup"""
class SignupView(APIView):
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({"success":"User Register Successfully"},status=status.HTTP_200_OK)
        
        
"""API for User Login"""
class LoginView(APIView):
    def post(self,request):
        email = request.data.get('email')    
        password = request.data.get('password')
        user=authenticate(username=email, password=password)
        if user:
            login(request, user)      
            usr=Token.objects.filter(user_id=user.id)
            if not usr:
                user_token=Token.objects.create(user=user) 
            else:
                user_token=Token.objects.filter(user_id=user.id).values_list("key",flat=True)[0]
            return Response({'Success':"Login Successfully",'Token':str(user_token)}, status=status.HTTP_200_OK)  
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)
        

"""API for User Logout"""
class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    def post(self,request):
        request.user.auth_token.delete()
        logout(request)
        return Response({"success":'User Logged out successfully'},status=status.HTTP_200_OK)