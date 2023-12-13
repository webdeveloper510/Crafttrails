from django.urls import path
from Adminapp.views import *


urlpatterns = [
    path("user/list/",UserList.as_view(),name="userlist"),
    path("user/status/<int:id>",ActIactView.as_view(),name="userstatus",),
    path("user/edit/<int:id>",UserEditView.as_view(),name="useredit"),
    path("user/location/<int:id>",ChangeLocationView.as_view(),name="userlocation"),
    path("user/update/<int:id>",ChangeProfileView.as_view(),name="userupdate"),
    path("user/listshow/<int:id>",ListShowActIactView.as_view(),name="listshow",),
    path("user/listexport/<int:id>",ListExportActIactView.as_view(),name="listexport",),
]
