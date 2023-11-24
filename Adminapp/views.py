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
            return Response({"code":200,"data":userlst.data},status=status.HTTP_200_OK)

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
            status_changed=change_status(request,id)
            return Response({"code":200,"data":"User status changed"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"unable to change status of user"},status=status.HTTP_200_OK)

"""API TO Get User Data USER"""
class UserEditView(APIView):
    permission_classes=[IsAdminUser]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'custom'

    def get(self,request,id):
        try:
            status_changed=user_edit(request,id)
            data=user_edit(request,id)
            return Response({"code":200,"data":data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"unable to change status of user"},status=status.HTTP_200_OK)

"""API TO Update Location Id of USER"""
class ChangeLocationView(APIView):
    permission_classes=[IsAdminUser]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'custom'

    def post(self,request,id):
        try:
            status_changed=change_location(request,id)
            return Response({"code":200,"data":"User location changed"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"unable to change status of user"},status=status.HTTP_200_OK)

"""API TO Update Location Id of USER"""
class ChangeProfileView(APIView):
    permission_classes=[IsAdminUser]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'custom'

    def post(self,request,id):
        try:
            status_changed=change_profile(request,id)
            return Response({"code":200,"data":"User data changed"},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"unable to change status of user"},status=status.HTTP_200_OK)








