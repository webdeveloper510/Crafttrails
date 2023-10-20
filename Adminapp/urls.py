from django.urls import path
from Adminapp.views import *


urlpatterns = [
    path("user/list/",UserList.as_view(),name="userlist")
]