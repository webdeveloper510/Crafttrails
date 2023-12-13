from django.urls import path
from Craftapp.views import *

urlpatterns = [
    path("register/",SignupView.as_view(),name="register"),
    path("googleregister/",GoogleSignupView.as_view(),name="googleregister"),
    path("userdata/<str:email>/",UserDataView.as_view(),name="userdata"),
    path("login/",LoginView.as_view(),name="login"),
    path("logout/",LogoutView.as_view(),name="logout"),
    path("userprofile/",Userprofile.as_view(),name="userprofile"),
    path("breweries/list/",BreweriesView.as_view(),name="breweries"),   
    path("breweries/list/<str:pid>",BreweriesIDView.as_view(),name="breweries"), 
    path("trail/list/",TrailView.as_view(),name="trail"),
    path("trailcomp/list/",TrailCompView.as_view(),name="trailcomp"),
    path("trail/list/<str:pid>",TrailIDView.as_view(),name="trail_id"),
    path("participants/list/",ParticipantsView.as_view(),name="participants"),
    path("participants/list/<str:pid>",ParticipantsIDView.as_view(),name="participants_id"),
    path("participants/points/list/",ParticipantsPointsView.as_view(),name="participantspoints"),
    path("participants/points/list/<str:pid>",ParticipantsPointsIDView.as_view(),name="participantspoints_id"),
    path("visit/list/",VisitView.as_view(),name="visit"),
    path("visit/list/<str:pid>",VisitIDView.as_view(),name="visit_id"),
    path('change_password/', ChangePassword.as_view(), name='change_password'),
    path('active_user/', ActiveUser.as_view(), name='active_user'),
    path('trail_analytics/', TrailsAnalytics.as_view(), name='trail_analytics'),
    path('breweries_name/', BreweriesName.as_view(), name='breweries_name'),
    path('participant_age/', ParticipantAge.as_view(), name='participant_age'),
    path('participant_gender/', ParticipantGender.as_view(), name='participant_gender'),
    path('usercount/', RegisterUnRegister.as_view(), name='usercount'),
    path('weekly/', WeeklyParticipants.as_view(), name='weekly'),
    path('weeklygrowth/', WeeklyGrowth.as_view(), name='weeklygrowth'),
    path('netchanges/', NetChanges.as_view(), name='netchanges'),
    path('participants/count/', ParticipantsCount.as_view(), name='participants'),
    path('user/links/', FetchLink.as_view(), name='user_links'),
    path('hottest/days/', HottestDay.as_view(), name='hottest_day'),
    path('membership/data/', Membership.as_view(), name='membership'),
    path("delete_user/<int:id>",Delete_user.as_view(),name="delete_user"),
    path("trail/export/",TrailCompExportView.as_view(),name="trailexport"),
    path("participant/export/",ParticipantExportView.as_view(),name="trailexport")
]
