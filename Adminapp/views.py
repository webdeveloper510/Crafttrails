from django.shortcuts import render
from rest_framework.views import APIView
from Adminapp.utils import *
from rest_framework.response import Response
from rest_framework import status


# Create your views here.
class UserList(APIView):
    def get(self,request):
        try:
            userlst=user_list(request)
            return Response({"code":200,"data":userlst},status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)


