from django.shortcuts import render
from rest_framework.views import APIView
from Adminapp.utils import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.throttling import ScopedRateThrottle



# Create your views here.

"""API TO FETCH USER LIST DATA"""
class UserList(APIView):
    permission_classes=[IsAdminUser]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'custom'

    def get(self,request):
        try:
            userlst=user_list(request)
            return Response({"code":200,"data":userlst},status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)
        

"""API TO ACTIVE INACTIVE USER"""
class ActIactView(APIView):
    permission_classes=[IsAdminUser]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'custom'

    def post(self,request,id):
        try:
            user_status=request.data.get("status")
            
            User.objects.filter(id=id).update(status=user_status)
            return Response({"code":200,"data":"User Active"},status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"code":400,"error":"unable to active user"},status=status.HTTP_200_OK)







