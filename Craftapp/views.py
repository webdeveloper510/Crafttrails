from rest_framework.views import APIView
from rest_framework.response import Response
from Craftapp.serializers import *
from rest_framework import status
from django.contrib.auth import authenticate, login,logout
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from Craftapp.utils import *
from rest_framework.throttling import ScopedRateThrottle
from django.core.files.storage import default_storage
from datetime import date 
from django.utils import timezone
import datetime
import pandas as pd
from io import BytesIO
from django.http import FileResponse,HttpResponse
import os


# Signal to indicate that a file has been downloaded



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
    
"""API for User  Google Signup"""
class GoogleSignupView(APIView):

    def post(self,request):
        data_val=request.data.get("location")
        data=request.data
        serializer=GoogleRegisterSerializer(data=request.data)
        check_email_val=User.objects.filter(email=data["email"])
        if check_email_val:
            check_email=User.objects.get(email=data["email"])
            
     
            data={"firstname":check_email.first_name,
                 "lastname":check_email.last_name,
                 "email":check_email.email,
                 "breweries_id":check_email.brewery,
                 "status":check_email.is_superuser,
                 "approved":check_email.status
            }
            if check_email:
                user_token=Token.objects.filter(user_id=check_email.id)
                if not user_token:
                    user_token=Token.objects.create(user=check_email) 
                else:
                    user_token=Token.objects.filter(user_id=check_email.id).values_list("key",flat=True)[0]
  
            return Response({"success":"User Login Successfully","token":str(user_token),"code":200,"data":data},status=status.HTTP_200_OK)


        if serializer.is_valid():
            serializer.save(brewery=data_val)
            
            user_val=User.objects.get(email=(data["email"]))
            data={"firstname":user_val.first_name,
                    "lastname":user_val.last_name,
                    "email":user_val.email,
                    "breweries_id":user_val.brewery,
                   "status":user_val.is_superuser,
                   "approved":user_val.status
            }
            user_token=Token.objects.create(user=user_val) 
            return Response({"success":"User Login Successfully","token":str(user_token),"code":200,"data":data},status=status.HTTP_200_OK)
       
        dynamic_key = next(iter(serializer.errors))
        
        return Response({"code":400,"error":serializer.errors[dynamic_key][0]},status=status.HTTP_200_OK)


"""API for Get User  data from database"""
class UserDataView(APIView):
    def get(self,request,email):
        
        
        user_val1=User.objects.filter(email=email)
        if user_val1:
            user_val=User.objects.get(email=email)
            data={"firstname":user_val.first_name,
                "lastname":user_val.last_name,
                "email":user_val.email,
                "breweries_id":user_val.brewery,
                "status":user_val.is_superuser,
                "approved":user_val.status
                } 
            return Response({"code":200,"data":data},status=status.HTTP_200_OK)
        else:    
            return Response({'error': 'Invalid email',"code":400}, status=status.HTTP_200_OK)
            
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
                    "email":user.email,
                    "breweries_id":user.brewery,
                   "status":user.is_superuser,
                   "listshow":user.listshow,
                   "listexport":user.listexport,
                   "approved":user.status
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

"""API TO GET USER PROFILE DATA """
class Userprofile(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            data=User.objects.filter(id=self.request.user.id).values()
            return Response({"code":200,"data":data},status=status.HTTP_200_OK)
        except Exception as e:  
     
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)

    


"""API TO GET BREWERIES DATA"""
class BreweriesView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            brewery_data=breweries(request)
            return Response({"code":200,"data":brewery_data[0]},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)

"""API TO GET BREWERIES DATA WITH ID"""
class BreweriesIDView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    

    def get(self,request,pid):
        try:
            brewery_data=breweries_all(request,pid)
            return Response({"code":200,"data":brewery_data[0]},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)


"""API TO GET TRAIL DATA"""
class TrailView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request):
        try:
            trails_data=trails(request)   
            return Response({"code":200,"data":trails_data},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)

"""API TO GET TRAIL on the Active Trail basis DATA"""
class TrailCompView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request):
        try:
            trails_data=trailscomp(request)   
            return Response({"code":200,"data":trails_data},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)

"""API TO GET TRAIL on the Active Trail basis DATA"""
class TrailIDCompView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request,pid):
        try:
            trails_data=trailsidcomp(request,pid)   
            return Response({"code":200,"data":trails_data},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)


"""API TO GET TRAIL DATA With ID"""
class TrailIDView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request,pid):
        try:
            trails_data=trails_all(request,pid)   
            return Response({"code":200,"data":trails_data},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)            



"""API TO GET PARTICIPANTS DATA"""
class ParticipantsView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]


    def get(self,request):
        try:
            participants_data=participants(request)
            return Response({"code":200,"data":participants_data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



"""API TO GET PARTICIPANTS DATA WITH ID"""
class ParticipantsIDView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]


    def get(self,request,pid):
        try:
            participants_data=participants_all(request,pid)
            return Response({"code":200,"data":participants_data},status=status.HTTP_200_OK)
        except Exception as e:
          
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)            
        


"""API TO GET PARTICIPANTS POINTS DATA"""
class ParticipantsPointsView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
  

    def get(self,request):
        try:
            partic_data=participantspoints(request)
            return Response({"code":200,"data":partic_data},status=status.HTTP_200_OK)
        except Exception as e:
           
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



"""API TO GET PARTICIPANTS POINTS DATA WITH ID"""
class ParticipantsPointsIDView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request,pid):
        try:
            partic_data=participantspoints_all(request,pid)
            return Response({"code":200,"data":partic_data},status=status.HTTP_200_OK)
        except Exception as e:
           
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)            
        


"""API TO GET VISIT DATA"""
class VisitView(APIView):                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            visit_data=visit(request)    
            return Response({"code":200,"data":visit_data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)


"""API TO GET VISIT DATA"""
class VisitIDView(APIView):                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request,pid):
        try:
            visit_data=visit_all(request,pid)    
            return Response({"code":200,"data":visit_data},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)            
        


"""API TO CHANGE PASSWORD"""
class ChangePassword(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    

    def post(self,request):
        serializer = ChangePasswordSerializer(data=request.data)
        if serializer.is_valid():
            user = request.user
            if user.check_password(serializer.data.get('old_password')):
                user.set_password(serializer.data.get('new_password'))
                user.save()
                return Response({'message': 'Password changed successfully',"code":200}, status=status.HTTP_200_OK)
            return Response({'error': 'Incorrect old password.',"code":200}, status=status.HTTP_200_BAD_REQUEST)
        return Response({"error":"Unable to change password","code":400}, status=status.HTTP_400_BAD_REQUEST)
    


"""API TO SHOW COUNT OF ACTIVE USER"""
class ActiveUser(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
  

    def get(self,request):
        try:
            trails_data=trailscomp(request)   
            active_trails_data=active_trails(request)   
            count=0
            for i in trails_data:
                val=[k for k in active_trails_data.json()["items"] for j in range(i["breweries_completed"]) if  i["location_to_complete"] and int(i["title_submenu"]["breweries_completed"][j]["id"])==int(k["title"])]
                if val: 
                    count=count+1
               
            active_user={
                "active_count":count
            }
            return Response({"code":200,"data":active_user},status=status.HTTP_200_OK)
        except Exception as e: 
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



"""API TO GET TRAILS ANALYTICS DATA"""
class TrailsAnalytics(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            trails_data=trailscomp(request)
              
        
            active_trails_data=active_trails(request)   
            for k in active_trails_data.json()["items"]:
                val=[round(i["breweries_completed"]/ int(i["location_to_complete"])*100,2) for i in trails_data if  i["location_to_complete"] and i["trail_year"]==k["s157fa6cfb"] ]
                          
            main_count=counts(request,val)
            
            breweries_analytics={
                "breweries_percentage":val,
                "0-16.67":main_count[0],
                "16.67-33.33":main_count[1],
                "33.33-50":main_count[2],
                "50-66.67":main_count[3],
                "66.67-83.33":main_count[4],
                "83.33-100":main_count[5]
            }
            

            return Response({"code":200,"data":breweries_analytics},status=status.HTTP_200_OK)
        except Exception as e:
           
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)
        


"""API TO GET LOGIN BREWERIES NAME"""
class BreweriesName(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            breweriesname=breweries(request)
            bar_name={"bar_name":breweriesname[1]}
            return Response({"code":200,"data":bar_name},status=status.HTTP_200_OK)

        except Exception as e:
           
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)
            
            

"""API TO GET PARTICIPANT AGE"""
class ParticipantAge(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            user_age=[]
            todays_date = date.today() 
            trails_data=trailscomp(request)   
            active_trails_data=active_trails(request)   
            participant_data=participants(request)
          
            for k in active_trails_data.json()["items"]:
             

                val=[int(i["master_id"]) for i in trails_data if i["master_id"] and i["location_to_complete"] and int(i["trail_year"])==int(k["s157fa6cfb"])]
               
            for paticipate in participant_data:
                
                if int(paticipate["master_id"]) in val:
                    if paticipate["date_of_birth"] != "":
                        dateofbirth=paticipate["date_of_birth"].split("T")[0]
                        yearofbirth=dateofbirth.split("-")[0]
                        age_calculate=todays_date.year - int(yearofbirth)
                    
                        user_age.append(age_calculate)

            main_count=age_counts(request,user_age)
            
            breweries_analytics={
                "age":user_age,
                "21-25":main_count[0],
                "26-35":main_count[1],
                "36-45":main_count[2],
                "46-55":main_count[3],
                "56-65":main_count[4],
                "66 and older":main_count[5]
            }
                    
            
            return Response({"code":200,"data":breweries_analytics},status=status.HTTP_200_OK)
        except Exception as e:
           
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



"""API TO GET PARTICIPANT Gender"""
class ParticipantGender(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
  

    def get(self,request):
        try:
            gender_type=[]
            todays_date = date.today() 
            trails_data=trailscomp(request)   
            active_trails_data=active_trails(request)   
            participant_data=participants(request)
          
            for k in active_trails_data.json()["items"]:
             

                val=[int(i["master_id"]) for i in trails_data if i["master_id"] and i["location_to_complete"] and int(i["trail_year"])==int(k["s157fa6cfb"])]
               
            for paticipate in participant_data:
                
                if int(paticipate["master_id"]) in val:
                    if paticipate["gender"] != "":
                        gendertype=paticipate["gender"]
                        
                    
                        gender_type.append(gendertype)

            main_count=gender_counts(request,gender_type)
            
            gender_analytics={
                "gender":gender_type,
                "male":main_count[0],
                "female":main_count[1],
                "transgender":main_count[2],
                "nonbinary":main_count[3],
               
            }
               
            return Response({"code":200,"data":gender_analytics},status=status.HTTP_200_OK)
        except Exception as e:
           
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



"""API TO GET REGISTER AND UNREGISTER USER"""
class RegisterUnRegister(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            active_trails_data=active_trails(request)
            trails_data=trailscomp(request)

            for i in active_trails_data.json()["items"]:
                
                register_user=[k["master_id"] for k in trails_data if k["master_id"] and k["location_to_complete"]]
                unregister_user=[k["master_id"] for k in trails_data if k["master_id"]=="" and k["location_to_complete"]]
            
            user_count={
                "register_user":len(register_user),
                "unregister_user":len(unregister_user)
            }
            return Response({"code":200,"data":user_count},status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)
        


"""API TO GET  COUNT OF WEEKLY PARTICIPANT"""
class WeeklyParticipants(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    


    def get(self,request):
       
        try:
            actve_participants=[]
            current_date = datetime.datetime.now()
            week_number = current_date.strftime("%U")
            sub_items=get_all_sub_items(request)
                  
            parcount=WeekParticipants.objects.filter(user_id=request.user.id).exists()
          
           
            if parcount ==False:
                WeekParticipants.objects.filter(user_id=request.user.id).create(user_id=request.user.id,weeknumber=week_number,participant=sub_items,weekname="week" + str(week_number))
            else:
                already=WeekParticipants.objects.filter(user_id=request.user.id,weekname="week"+str(week_number)).exists()
                if already == True:
                    WeekParticipants.objects.filter(user_id=request.user.id,weekname="week" + str(week_number)).update(participant=sub_items)
                else:
                    WeekParticipants.objects.filter(user_id=request.user.id).create(user_id=request.user.id,weeknumber=week_number,participant=sub_items,weekname="week" + str(week_number))

            week_data=WeekParticipants.objects.filter(user_id=request.user.id)
          
            for i in week_data:
                week_count={
                        i.weekname:i.participant
            }
                actve_participants.append(week_count)
                   

            return Response({"code":200,"data":actve_participants},status=status.HTTP_200_OK)
        except Exception as e:
           
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)




"""API TO GET COUNT OF WEEKLY GROWTH OF PARTICIPANT"""
class WeeklyGrowth(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    

    def get(self,request):
        try:
            current_date = datetime.datetime.now()
            week_number = current_date.strftime("%U")
            growth=calculate_growth(request,week_number)
            
            
            return Response({"code":200,"data":growth},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)



"""API TO GET COUNT OF WEEKLY GROWTH OF PARTICIPANT"""
class WeeklyGrowth(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    

    def get(self,request):
        try:
            current_date = datetime.datetime.now()
            week_number = current_date.strftime("%U")
            growth=calculate_growth(request,week_number)
            weekly_growth={
                "growth":growth
            }
            
            return Response({"code":200,"data":weekly_growth},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)
        


"""API TO CALCULATE NET CHANGE IN NUMBER OF PARTICIPANT"""
class NetChanges(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    

    def get(self,request):
        try:
            current_date = datetime.datetime.now()
            week_number = current_date.strftime("%U")
            growth=calculate_netchange(request,week_number)
            net_changes={
                "netchanges":growth
            }
            
            
            return Response({"code":200,"data":net_changes},status=status.HTTP_200_OK)
        except Exception as e:
           
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)



"""API TO COUNT PARTICIPANTS COUNTS"""
class ParticipantsCount(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    

    def get(self,request):
        try:
            
            trails_data=trailscomp(request)
            data=trail_participant(request,trails_data)

            return Response({"code":200,"data":data},status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)



"""API TO GETCH LINK OF PARTICIPANTS"""
class FetchLink(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        # try:
            urls_data=urls_link(request)
            
            return Response({"code":200,"data":urls_data},status=status.HTTP_200_OK)
        # except Exception as e:
        
        #     return Response({"code":200,"error":"unable to fetch data"},status=status.HTTP_200_OK)


"""API TO CALCULATE HOTTEST DAY OF THE WEEK"""
class HottestDay(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
    

    def get(self,request):
        try:
            hottest_data=hottest_day(request)
            format_change=change_format(request,hottest_data)
            res = {}
            for dic in format_change:
                for key, val in dic.items():
                    if key in res:
                        res[key] = max(res[key], val)
                    else:
                        res[key] = val
           
            return Response({"code":200,"data":res})
        except Exception as e:
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)
        



"""API TO CALCULATE TOP AND BOTTOM POINTS EARNER"""
class Membership(APIView):
    permission_classes=[IsAuthenticated]                                                                                                                                                                                                                                                                                                                                                                                                                            
    authentication_classes=[TokenAuthentication]
   

    def get(self,request):
        try:
            filter_data=list_user(request)
            return Response({"code":200,"data":filter_data},status=status.HTTP_200_OK)
        except Exception as e:  
            
            return Response({"code":400,"error":"unable to fetch data"},status=status.HTTP_200_OK)



"""API TO Delete User """
class Delete_user(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
    
    def delete(self, request, id):
        try:
            user = User.objects.get(id=id)
            user.delete()
            return Response({'code': 200, 'message': 'User deleted successfully'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'code': 404, 'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)


"""API TO EXPORT TRAIL on the Active Trail basis DATA"""
class TrailCompExportView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request):
        try:
            id=request.user.id
            main_data=[]
            json_data=trailscomp(request)  
            for i in json_data:
               
                main_data1 = {
                        'title': i['title'],
                        'application_id': i['application_id'],
                        'participant_id': i['participant_id'],
                        'breweries_completed': i['breweries_completed'],
                        'trail_name': i['trail_name'],
                        'trail_year': i['trail_year'],
                        'trail_season': i['trail_season'],
                        'mini_tour': i['mini_tour'],
                        'master_id': i['master_id'],
                        'location_to_complete': i['location_to_complete']
                    }
                   
                main_data.append(main_data1)    
           
            
            df = pd.DataFrame(main_data)
            buffer = BytesIO()

            # Save DataFrame to the BytesIO buffer
            df.to_csv(buffer, index=False, encoding='utf-8')
            current_datetime = timezone.now().strftime("%Y%m%d%H%M%S")    
            file_name = str(id)+current_datetime+"_"+'trail.csv'
            file_path = os.path.join(settings.MEDIA_ROOT, file_name)
            with open(file_path, 'wb') as file:
                buffer.seek(0)
                file.write(buffer.read())

            # Create the HTTP response with appropriate headers
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'

            # Write the file content to the response
            with open(file_path, 'rb') as file:
                response.write(file.read())
           
            # Get the full URL to the file
            file_url = os.path.join(settings.MEDIA_URL, file_name)
            file_url1="http://localhost:3000/"+file_url
            # file_url1="https://trailmetrics.cctrails.com"+file_url
            UserFile.objects.create(user_id=id,file_path=file_url1)
            userfile=UserFile.objects.filter(user_id=id).last()
            userfile1=userfile.file_path

             # Respond with the full URL and other data
            response_data = {"code": 200, "message": "CSV file generated successfully", "file_url": userfile1}
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



"""API TO EXPORT Participant DATA"""
class ParticipantExportView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request):
        try:
            id=request.user.id
            participant_data=participants(request)  
            df = pd.DataFrame(participant_data)
          
            buffer = BytesIO()

            df.to_csv(buffer, index=False, encoding='utf-8')
            current_datetime = timezone.now().strftime("%Y%m%d%H%M%S")    
            file_name = str(id)+current_datetime+"_"+ "participants.csv"
            
            file_path = os.path.join(settings.MEDIA_ROOT, file_name)
            with open(file_path, 'wb') as file:
                buffer.seek(0)
                file.write(buffer.read())

            # Create the HTTP response with appropriate headers
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'

            # Write the file content to the response
            with open(file_path, 'rb') as file:
                response.write(file.read())
           
            # Get the full URL to the file
            file_url = os.path.join(settings.MEDIA_URL, file_name)
            # file_url1="http://127.0.0.1:8000"+file_url
            file_url1="http://localhost:3000/"+file_url
            UserFile.objects.create(user_id=id,file_path=file_url1)
            userfile=UserFile.objects.filter(user_id=id).last()
            userfile1=userfile.file_path
            
            response_data = {"code": 200, "message": "CSV file generated successfully", "file_url": userfile1}
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)

"""API TO EXPORT VISIT DATA"""
class VisitExportView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request):
        try:
            id=request.user.id
            visit_data=visit(request)  
            df = pd.DataFrame(visit_data)
          
            buffer = BytesIO()

            df.to_csv(buffer, index=False, encoding='utf-8')
            current_datetime = timezone.now().strftime("%Y%m%d%H%M%S")    
            file_name = str(id)+current_datetime+"_"+ "visit.csv"
           
            file_path = os.path.join(settings.MEDIA_ROOT, file_name)
            with open(file_path, 'wb') as file:
                buffer.seek(0)
                file.write(buffer.read())

            # Create the HTTP response with appropriate headers
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'

            # Write the file content to the response
            with open(file_path, 'rb') as file:
                response.write(file.read())
           
            # Get the full URL to the file
            file_url = os.path.join(settings.MEDIA_URL, file_name)
            # file_url1="http://127.0.0.1:8000"+file_url
            file_url1="http://localhost:3000/"+file_url
            UserFile.objects.create(user_id=id,file_path=file_url1)
            userfile=UserFile.objects.filter(user_id=id).last()
            userfile1=userfile.file_path
            
            response_data = {"code": 200, "message": "CSV file generated successfully", "file_url": userfile1}
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)



"""API TO EXPORT PARTICPANTS POINTS DATA"""
class ParticipantPointsExportView(APIView):
    permission_classes=[IsAuthenticated]
    authentication_classes=[TokenAuthentication]
 

    def get(self,request):
        try:
            id=request.user.id
            points_data=participantspoints(request)  
            df = pd.DataFrame(points_data)
          
            buffer = BytesIO()

            df.to_csv(buffer, index=False, encoding='utf-8')
            current_datetime = timezone.now().strftime("%Y%m%d%H%M%S")    
            file_name = str(id)+current_datetime+"_"+ "participantpoint.csv"
            
            file_path = os.path.join(settings.MEDIA_ROOT, file_name)
            with open(file_path, 'wb') as file:
                buffer.seek(0)
                file.write(buffer.read())

            # Create the HTTP response with appropriate headers
            response = HttpResponse(content_type='text/csv')
            response['Content-Disposition'] = f'attachment; filename="{file_name}"'

            # Write the file content to the response
            with open(file_path, 'rb') as file:
                response.write(file.read())
           
            # Get the full URL to the file
            file_url = os.path.join(settings.MEDIA_URL, file_name)
            # file_url1="http://127.0.0.1:8000"+file_url
            file_url1="http://localhost:3000/"+file_url
            UserFile.objects.create(user_id=id,file_path=file_url1)
            userfile=UserFile.objects.filter(user_id=id).last()
            userfile1=userfile.file_path
            
            response_data = {"code": 200, "message": "CSV file generated successfully", "file_url": userfile1}
            return Response(response_data, status=status.HTTP_200_OK)
        except Exception as e:
            
            return Response({"code":400,"error":"Unable to fetch data"},status=status.HTTP_200_OK)






        
    


