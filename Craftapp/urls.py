from django.urls import path,include
from Craftapp.views import *

urlpatterns = [
    path("register/",SignupView.as_view(),name="register"),
    path("login/",LoginView.as_view(),name="login"),
    path("logout/",LogoutView.as_view(),name="logout"),
    path("breweries/list/",BreweriesView.as_view(),name="breweries"),
    path("trail/list/",TrailView.as_view(),name="trail"),
    path("participants/list/",ParticipantsView.as_view(),name="participants")
]
