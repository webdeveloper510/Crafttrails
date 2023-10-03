from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from Craftapp.serializers import *
from rest_framework import status
from django.contrib.auth import authenticate, login,logout
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import requests
from CraftTrails import settings
from Craftapp.utils import *


# Create your views here.
"""API for User Signup"""
class SignupView(APIView):
    def post(self,request):
        serializer=RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success":"User Register Successfully","code":200},status=status.HTTP_200_OK)
       
        dynamic_key = next(iter(serializer.errors))
        return Response({"code":400,"error":serializer.errors[dynamic_key][0]},status=status.HTTP_200_OK)
        
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
            data={"firstname":user.first_name,
                    "lastname":user.last_name,
                    "email":user.email
            }
            return Response({'success':"Login Successfully",'token':str(user_token),"code":200,"data":data}, status=status.HTTP_200_OK)  
        else:
            return Response({'error': 'Invalid credentials',"code":400}, status=status.HTTP_200_OK)
        

"""API for User Logout"""
class LogoutView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    def post(self,request):
        request.user.auth_token.delete()
        logout(request)
        return Response({"success":'User Logged out successfully'},status=status.HTTP_200_OK)
    

class BreweriesView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            brewery_data=breweries(request)
            return Response({"code":200,"data":brewery_data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



class TrailView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            trails_data=trails(request)   
            return Response({"code":200,"data":trails_data},status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
       
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)


class ParticipantsView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            participants_data=participants(request)
            return Response({"code":200,"data":participants_data},status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)
        


class ParticipantsPointsView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            partic_data=participantspoints(request)
            return Response({"code":200,"data":partic_data},status=status.HTTP_200_OK)
        except Exception as e:
            print("Ssssssss",e)
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)
        



class VisitView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            visit_data=visit(request)    
            return Response({"code":200,"data":visit_data},status=status.HTTP_200_OK)
        except Exception as e:
        
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)