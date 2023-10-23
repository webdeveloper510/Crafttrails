from django.urls import path
from Adminapp.views import *


urlpatterns = [
    path("user/list/",UserList.as_view(),name="userlist"),
    path("user/status/<int:id>",ActIactView.as_view(),name="userstatus")
]