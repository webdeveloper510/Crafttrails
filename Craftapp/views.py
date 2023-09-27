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
            breweries_list=[]
            base_url = settings.base_url
            headers = {
                "Authorization": settings.authorization,
                "Account-Id":  settings.account_id,
                "Content-Type": "application/json"
            }
            app_ids = settings.breweries_id 
            response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
            for i in response.json()["items"]:
                data={
                    "application_id":i["id"],
                    "title":i["title"],
                    "home_city":i["scc71d5fd5"],
                    "home_name":i["sb1594021e"],
                    "bar_name":i["s8a95871e9"]
                }
                breweries_list.append(data)  
            data=breweries_list
            return Response({"code":200,"data":data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



class TrailView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            trail_list=[]
            base_url = settings.base_url
            headers = {
                "Authorization": settings.authorization,
                "Account-Id":  settings.account_id,
                "Content-Type": "application/json"
            }
            app_ids = settings.trailmaster_id 
            response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
           
            for i in response.json()["items"]:
                data={
                    "application_id":i["id"],
                    "title":i["title"],
                    "participant_id":i["s99187d139"],
                    "trail_name":i["sc270d76da"],
                    "trail_year":i["scef57f448"],
                    "trail_season":i["sd25a89828"],
                    "mini_tour":i["s56b038ef3"], 
                    "master_id":i["s0d1c07938"],   
                }
                trail_list.append(data)  
            data=trail_list     
            return Response({"code":200,"data":trail_list},status=status.HTTP_200_OK)
        except Exception as e:
       
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)


class ParticipantsView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            participant_list=[]
            base_url = settings.base_url
            headers = {
                "Authorization": settings.authorization,
                "Account-Id": settings.account_id,
                "Content-Type": "application/json"
            }
            app_ids = settings.participants_id 
            response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
            
            for i in response.json()["items"]:
                if i["s37e762ac3"]:
                    data={
                        "title":i["title"],
                        "rfid_tag":i["sbb8fea034"],
                        "full_name":i["s37af43f83"]["sys_root"],
                        "email":i["sac950cfcc"][0],
                        "date_of_birth":i["sac87d276d"]["date"],
                        "master_id":i["sd48be64b7"], 
                        "phone_number":i["s37e762ac3"][0]["sys_title"],  
                        "address":i["sb91047f0b"]["location_address"]
                    }

                else:
                    data={
                        "title":i["title"],
                        "rfid_tag":i["sbb8fea034"],
                        "full_name":i["s37af43f83"]["sys_root"],
                        "email":i["sac950cfcc"][0],
                        "date_of_birth":i["sac87d276d"]["date"],
                        "master_id":i["sd48be64b7"], 
                        "phone_number":"",  
                        "address":i["sb91047f0b"]["location_address"]
                    }

                participant_list.append(data)  
            data=participant_list     
            return Response({"code":200,"data":participant_list},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)
        


class ParticipantsPointsView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            participant_points=[]
            base_url = settings.base_url
            headers = {
                "Authorization": settings.authorization,
                "Account-Id":  settings.account_id,
                "Content-Type": "application/json"
            }
            app_ids = settings.participants_points
            response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
            
            for i in response.json()["items"]:
              
                data={
                    "master_id":i["title"],
                    "name_of_participants":i["s332210fbb"],
                    "points_earned":i["s1255e267e"]["count"],
                }

                participant_points.append(data)  
            data=participant_points     
            return Response({"code":200,"data":participant_points},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)
        



class VisitView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]

    def get(self,request):
        try:
            visit_list=[]
            base_url = settings.base_url
            headers = {
                "Authorization": settings.authorization,
                "Account-Id": settings.account_id,
                "Content-Type": "application/json"
            }
            app_ids = settings.visit
            response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
            
            for i in response.json()["items"]:
              
                data={
                    "title":i["title"],
                    "master_participants_id":i["s211c64472"],
                    "visit_date":i["s7bed21761"]["date"],
                    "location_id":i["s9d5037e2f"],
                    "rfid":i["sea475d5e4"]
                }

                visit_list.append(data)  
            data=visit_list     
            return Response({"code":200,"data":visit_list},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)