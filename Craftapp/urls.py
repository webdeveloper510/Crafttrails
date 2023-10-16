from django.urls import path
from Craftapp.views import *

urlpatterns = [
    path("register/",SignupView.as_view(),name="register"),
    path("login/",LoginView.as_view(),name="login"),
    path("logout/",LogoutView.as_view(),name="logout"),
    path("breweries/list/",BreweriesView.as_view(),name="breweries"),
    path("trail/list/",TrailView.as_view(),name="trail"),
    path("participants/list/",ParticipantsView.as_view(),name="participants"),
    path("participants/points/list/",ParticipantsPointsView.as_view(),name="participantspoints"),
    path("visit/list/",VisitView.as_view(),name="visit"),
    path('change_password/', ChangePassword.as_view(), name='change_password'),
    path('active_user/', ActiveUser.as_view(), name='active_user'),
    path('trail_analytics/', TrailsAnalytics.as_view(), name='trail_analytics'),
    path('breweries_name/', BreweriesName.as_view(), name='breweries_name'),
    path('participant_age/', ParticipantAge.as_view(), name='participant_age'),
    path('usercount/', RegisterUnRegister.as_view(), name='usercount'),
    path('weekly/', WeeklyParticipants.as_view(), name='weekly'),
    path('weeklygrowth/', WeeklyGrowth.as_view(), name='weeklygrowth'),
    path('netchanges/', NetChanges.as_view(), name='netchanges'),
    path('participants/count/', ParticipantsCount.as_view(), name='participants'),
]
