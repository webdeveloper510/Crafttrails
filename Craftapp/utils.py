from CraftTrails import settings
import requests
from .models import *
import datetime


def breweries(request):
    breweries_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.breweries_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    bar_name=""
    
    for i in response.json()["items"]:
     
        if int(i["title"])==int(request.user.brewery):
            bar_name=i["s8a95871e9"]
        
            data={
                "title":i["title"],
                "application_id":i["id"],
                "home_city":i["scc71d5fd5"],
                "home_name":i["sb1594021e"],
                "bar_name":i["s8a95871e9"],
                "max_capacity":i["s954ab521d"],
                "title_submenu":{
                    "title":i["title"],
                    "trail_link":i["sf6l341b"],
                    "indore_seating":i["s143e1cdf6"],
                    "outdoor_seting":i["s99c9760cf"],
                    "kid_friendly":i["sc43d290a1"],
                    "dog_friendly":i["sbfdbacabe"],
                    "brewery_name":i["s4092fdc16"],
                    "contact_name":i["s1bf5c94ab"],
                    "contact_email":i["s621deff9c"],
                    "reach_number":i["s0941b34fd"],
                    "customer_face_phone":i["s4f68aacef"],
                    "address":i["s6bc0e1667"],
                    "have_live_music":i["sbb661fe53"],
                    "food_available":i["s827ace380"],
                    "public_tour":i["s57a08fb4b"],
                    "untappd_url":i["s9yt9ss7"],
                    "twitter_url":i["s8ykzlvc"],
                    "instagram_url":i["szm9u2od"],
                    "facebook_url":i["s586c43040"],
                    "formula":i["s809a2b9cb"],
                    "event_calender":i["s8e5b5d9d9"],
                    "food_photos":i["s44be84238"],
                    "photo_of_drink":i["s12dd86f04"],
                    "drink_option":i["s6a53b58cb"],
                    "website":i["s4a2531de8"],
                    "establishment":i["sfb39beff9"],
                    "logo":i["s8f6a2a5b8"],
                        
                }
            }
            breweries_list.append(data)  
    data=breweries_list
    return breweries_list,bar_name

def breweries_all(request,pid):
    breweries_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.breweries_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    bar_name=""
    
    for i in response.json()["items"]:
       
        if i["title"]==pid:
            bar_name=i["s8a95871e9"]
        
            data={
                "title":i["title"],
                "application_id":i["id"],
                "home_city":i["scc71d5fd5"],
                "home_name":i["sb1594021e"],
                "bar_name":i["s8a95871e9"],
                "max_capacity":i["s954ab521d"],
                "title_submenu":{
                    "title":i["title"],
                    "trail_link":i["sf6l341b"],
                    "indore_seating":i["s143e1cdf6"],
                    "outdoor_seting":i["s99c9760cf"],
                    "kid_friendly":i["sc43d290a1"],
                    "dog_friendly":i["sbfdbacabe"],
                    "brewery_name":i["s4092fdc16"],
                    "contact_name":i["s1bf5c94ab"],
                    "contact_email":i["s621deff9c"],
                    "reach_number":i["s0941b34fd"],
                    "customer_face_phone":i["s4f68aacef"],
                    "address":i["s6bc0e1667"],
                    "have_live_music":i["sbb661fe53"],
                    "food_available":i["s827ace380"],
                    "public_tour":i["s57a08fb4b"],
                    "untappd_url":i["s9yt9ss7"],
                    "twitter_url":i["s8ykzlvc"],
                    "instagram_url":i["szm9u2od"],
                    "facebook_url":i["s586c43040"],
                    "formula":i["s809a2b9cb"],
                    "event_calender":i["s8e5b5d9d9"],
                    "food_photos":i["s44be84238"],
                    "photo_of_drink":i["s12dd86f04"],
                    "drink_option":i["s6a53b58cb"],
                    "website":i["s4a2531de8"],
                    "establishment":i["sfb39beff9"],
                    "logo":i["s8f6a2a5b8"],
                        
                }
            }
            breweries_list.append(data)  
    data=breweries_list
    return breweries_list




def trails(request):
    pid=request.user.brewery
    breweries_completed=[]
    trail_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.visit
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
   
    unique_master_id=set()
    for i in response.json()["items"] :
        if i["s9d5037e2f"]==pid :
            if i["s211c64472"]!="":
                master_id1=i["s211c64472"]
                unique_master_id.add(master_id1)
                
               

    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
 
    for i in response.json()["items"]:
        if i["s0d1c07938"] in list(unique_master_id):
            if i["s2f8f93c23"]=="":
                i["s2f8f93c23"]=1
            if i["sb7210e570"]["count"]>0:
                data={
                    
                    "title":i["title"],
                    "application_id":i["id"],
                    "participant_id":i["s99187d139"],
                    "breweries_completed":i["sb7210e570"]["count"],
                    "trail_name":i["sc270d76da"],
                    "trail_year":i["scef57f448"],
                    "trail_season":i["sd25a89828"],
                    "mini_tour":i["s56b038ef3"], 
                    "master_id":i["s0d1c07938"],  
                    "location_to_complete":i["s2f8f93c23"],
                
                    "title_submenu":{
                        "title":i["title"],
                        "participant_id":i["s99187d139"],
                        "trail_name":i["sc270d76da"],
                        "trail_year":i["scef57f448"],  
                        "trail_season":i["sd25a89828"],
                        "mini_tour":i["s56b038ef3"],
                        "link__breweries":i["s24c712a83"],
                        "breweries_completed":[]
                  }
                } 
                for k in range(i["sb7210e570"]["count"]):
                    data1={
                        "count":i["sb7210e570"]["count"],
                        "name":i["sb7210e570"]["items"][k]["name"],
                        "id":i["sb7210e570"]["items"][k]["name"],
                        "date":i["sb7210e570"]["items"][k]["first_created"]["on"]
                    }
                    breweries_completed.append(data1)
                    data["title_submenu"]["breweries_completed"].append(data1)
                            
                trail_list.append(data) 
                

    breweries_data=breweries_all(request,pid)
    for i in breweries_data:
        for j in trail_list:
            for k in range(j["breweries_completed"]):
                     
                if j["title_submenu"]["breweries_completed"][k]["name"]==i["title"]:
                    j["title_submenu"]["breweries_completed"][k]["name"]=i["bar_name"]        
          
    data=trail_list     
    return data


def trailscomp(request):
    pid=request.user.brewery
    
    breweries_completed=[]
    trail_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.active_trails
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    for i in response.json()["items"] :
        if i["title"]==pid:
            trail_name=i["s9b9447a8e"]
            trail_year=i["s157fa6cfb"]
            trail_season=i["s74aaea978"]
            trail_minitour=i["sd82de27d5"]
          
           
    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
 
    for i in response.json()["items"]:
       
        if trail_name==i["sc270d76da"] and trail_year==i["scef57f448"] and trail_season==i["sd25a89828"] and trail_minitour==i["s56b038ef3"]:
            
            if i["s2f8f93c23"]=="":
                i["s2f8f93c23"]=1
            if i["sb7210e570"]["count"]>0:
                data={
                    
                    "title":i["title"],
                    "application_id":i["id"],
                    "participant_id":i["s99187d139"],
                    "breweries_completed":i["sb7210e570"]["count"],
                    "trail_name":i["sc270d76da"],
                    "trail_year":i["scef57f448"],
                    "trail_season":i["sd25a89828"],
                    "mini_tour":i["s56b038ef3"], 
                    "master_id":i["s0d1c07938"],  
                    "location_to_complete":i["s2f8f93c23"],
                    "is_solo_trail":i["sedee2e81b"],
                    "passport":i["s99187d139"],
                    "title_submenu":{
                        "title":i["title"],
                        "participant_id":i["s99187d139"],
                        "trail_name":i["sc270d76da"],
                        "trail_year":i["scef57f448"],  
                        "trail_season":i["sd25a89828"],
                        "mini_tour":i["s56b038ef3"],
                        "link__breweries":i["s24c712a83"],
                        "breweries_completed":[]
                  }
                } 
                for k in range(i["sb7210e570"]["count"]):
                    data1={
                        "count":i["sb7210e570"]["count"],
                        "name":i["sb7210e570"]["items"][k]["name"],
                        "id":i["sb7210e570"]["items"][k]["name"],
                        "date":i["sb7210e570"]["items"][k]["first_created"]["on"]
                    }
                    breweries_completed.append(data1)
                    data["title_submenu"]["breweries_completed"].append(data1)
                            
                trail_list.append(data) 
                

    breweries_data=breweries_all(request,pid)
    for i in breweries_data:
        for j in trail_list:
            for k in range(j["breweries_completed"]):
                     
                if j["title_submenu"]["breweries_completed"][k]["name"]==i["title"]:
                    j["title_submenu"]["breweries_completed"][k]["name"]=i["bar_name"]        
          
    data=trail_list     
    return data   

def trailsidcomp(request,pid):
     
    breweries_completed=[]
    trail_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.active_trails
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    for i in response.json()["items"] :
        if i["title"]==pid:
            trail_name=i["s9b9447a8e"]
            trail_year=i["s157fa6cfb"]
            trail_season=i["s74aaea978"]
            trail_minitour=i["sd82de27d5"]
          
           
    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
 
    for i in response.json()["items"]:
       
        if trail_name==i["sc270d76da"] and trail_year==i["scef57f448"] and trail_season==i["sd25a89828"] and trail_minitour==i["s56b038ef3"]:
            
            if i["s2f8f93c23"]=="":
                i["s2f8f93c23"]=1
            if i["sb7210e570"]["count"]>0:
                data={
                    
                    "title":i["title"],
                    "application_id":i["id"],
                    "participant_id":i["s99187d139"],
                    "breweries_completed":i["sb7210e570"]["count"],
                    "trail_name":i["sc270d76da"],
                    "trail_year":i["scef57f448"],
                    "trail_season":i["sd25a89828"],
                    "mini_tour":i["s56b038ef3"], 
                    "master_id":i["s0d1c07938"],  
                    "location_to_complete":i["s2f8f93c23"],
                
                    "title_submenu":{
                        "title":i["title"],
                        "participant_id":i["s99187d139"],
                        "trail_name":i["sc270d76da"],
                        "trail_year":i["scef57f448"],  
                        "trail_season":i["sd25a89828"],
                        "mini_tour":i["s56b038ef3"],
                        "link__breweries":i["s24c712a83"],
                        "breweries_completed":[]
                  }
                } 
                for k in range(i["sb7210e570"]["count"]):
                    data1={
                        "count":i["sb7210e570"]["count"],
                        "name":i["sb7210e570"]["items"][k]["name"],
                        "id":i["sb7210e570"]["items"][k]["name"],
                        "date":i["sb7210e570"]["items"][k]["first_created"]["on"]
                    }
                    breweries_completed.append(data1)
                    data["title_submenu"]["breweries_completed"].append(data1)
                            
                trail_list.append(data) 
                

    breweries_data=breweries_all(request,pid)
    for i in breweries_data:
        for j in trail_list:
            for k in range(j["breweries_completed"]):
                     
                if j["title_submenu"]["breweries_completed"][k]["name"]==i["title"]:
                    j["title_submenu"]["breweries_completed"][k]["name"]=i["bar_name"]        
          
    data=trail_list     
    return data   


def trails_all(request,pid):
    breweries_completed=[]
    trail_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.visit
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
   
    unique_master_id=set()
    for i in response.json()["items"] :
        if i["s9d5037e2f"]==pid :
            if i["s211c64472"]!="":
                master_id1=i["s211c64472"]
                unique_master_id.add(master_id1)
               
               

    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
 
    for i in response.json()["items"]:
        if i["s0d1c07938"] in list(unique_master_id):
        
            if i["sb7210e570"]["count"]>0:
                data={
                    
                    "title":i["title"],
                    "application_id":i["id"],
                    "participant_id":i["s99187d139"],
                    "breweries_completed":i["sb7210e570"]["count"],
                    "trail_name":i["sc270d76da"],
                    "trail_year":i["scef57f448"],
                    "trail_season":i["sd25a89828"],
                    "mini_tour":i["s56b038ef3"], 
                    "master_id":i["s0d1c07938"],  
                    "location_to_complete":i["s2f8f93c23"],
                
                    "title_submenu":{
                        "title":i["title"],
                        "participant_id":i["s99187d139"],
                        "trail_name":i["sc270d76da"],
                        "trail_year":i["scef57f448"],  
                        "trail_season":i["sd25a89828"],
                        "mini_tour":i["s56b038ef3"],
                        "link__breweries":i["s24c712a83"],
                        "breweries_completed":[]
                  }
                } 
                for k in range(i["sb7210e570"]["count"]):
                    data1={
                        "count":i["sb7210e570"]["count"],
                        "name":i["sb7210e570"]["items"][k]["name"],
                        "id":i["sb7210e570"]["items"][k]["name"],
                        "date":i["sb7210e570"]["items"][k]["first_created"]["on"]
                    }
                    breweries_completed.append(data1)
                    data["title_submenu"]["breweries_completed"].append(data1)
                            
                trail_list.append(data) 
                
    breweries_data=breweries_all(request,pid)
    for i in breweries_data:
        for j in trail_list:
            for k in range(j["breweries_completed"]):
                     
                if j["title_submenu"]["breweries_completed"][k]["name"]==i["title"]:
                    j["title_submenu"]["breweries_completed"][k]["name"]=i["bar_name"]        
        
    data=trail_list     
    return data    



def participants(request):
    pid=request.user.brewery
   
    participant_list=[]
    val=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id": settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.active_trails
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    for i in response.json()["items"] :
        if i["title"]==pid:
            trail_name=i["s9b9447a8e"]
            trail_year=i["s157fa6cfb"]
            trail_season=i["s74aaea978"]
            trail_minitour=i["sd82de27d5"]
          
           
    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
 
    for i in response.json()["items"]:
       
        if trail_name==i["sc270d76da"] and trail_year==i["scef57f448"] and trail_season==i["sd25a89828"] and trail_minitour==i["s56b038ef3"]:
            passport=i["s99187d139"]
            val.append(passport)
   
        
    # app_ids = settings.visit
    # response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
   
    # unique_master_id=set()
    # for i in response.json()["items"] :
        
    #     if i["s9d5037e2f"]==pid :
    #         if i["s211c64472"]!="":
               
    #             master_id1=i["s211c64472"]
    #             unique_master_id.add(master_id1)
              
    # 
    app_ids = settings.participants_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    count=0    
    for i in response.json()["items"] :
        
        
        # if i["sd48be64b7"] in list(unique_master_id):
        if i["sbb8fea034"] in val:
            
            
            try:
                date=i["sac87d276d"]["date"]
            except Exception as e:
                date=""    

            data={
                "title":i["title"],
                "rfid_tag":i["sbb8fea034"],
                "full_name":i["s37af43f83"]["sys_root"],
                "email":i["sac950cfcc"],
                "date_of_birth":date,
                "master_id":i["sd48be64b7"], 
                "phone_number":i["s37e762ac3"],  
                "address":i["sb91047f0b"]["location_address"],
                "gender":i["sab36dd930"],
                "title_submenu":{
                    "title":i["title"],
                    "record_id":i["sfb74e1363"],
                    "rfid_tag":i["sbb8fea034"],
                    "email":i["sac950cfcc"],
                    "full_name":i["s37af43f83"]["sys_root"],
                    "date_of_birth":date,
                    "master_id":i["sd48be64b7"],
                    "phone_number":i["s37e762ac3"],
                    "address":i["sb91047f0b"]["location_address"],
                    "can_text":i["s5d2aed3fd"],
                }
            }

            participant_list.append(data)  
    data= participant_list  
 
    return data

def participants_all(request,pid):
    val=[]
    participant_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id": settings.account_id,
        "Content-Type": "application/json"
    }
    # app_ids = settings.visit
    # response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
   
    # unique_master_id=set()
    # for i in response.json()["items"] :
        
    #     if i["s9d5037e2f"]==pid :
    #         if i["s211c64472"]!="":
               
    #             master_id1=i["s211c64472"]
    #             unique_master_id.add(master_id1)
               
    app_ids = settings.active_trails
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    for i in response.json()["items"] :
        if i["title"]==pid:
            trail_name=i["s9b9447a8e"]
            trail_year=i["s157fa6cfb"]
            trail_season=i["s74aaea978"]
            trail_minitour=i["sd82de27d5"]
          
           
    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
 
    for i in response.json()["items"]:
       
        if trail_name==i["sc270d76da"] and trail_year==i["scef57f448"] and trail_season==i["sd25a89828"] and trail_minitour==i["s56b038ef3"]:
            passport=i["s99187d139"]
            val.append(passport)        

    app_ids = settings.participants_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
       
    for i in response.json()["items"] :
        
        if i["sbb8fea034"] in val:
           
            try:
                date=i["sac87d276d"]["date"]
            except Exception as e:
                date=""    

            
            data={
                "title":i["title"],
                "rfid_tag":i["sbb8fea034"],
                "full_name":i["s37af43f83"]["sys_root"],
                "email":i["sac950cfcc"],
                "date_of_birth":date,
                "master_id":i["sd48be64b7"], 
                "phone_number":i["s37e762ac3"],  
                "address":i["sb91047f0b"]["location_address"],
                "title_submenu":{
                    "title":i["title"],
                    "record_id":i["sfb74e1363"],
                    "rfid_tag":i["sbb8fea034"],
                    "email":i["sac950cfcc"],
                    "full_name":i["s37af43f83"]["sys_root"],
                    "date_of_birth":date,
                    "master_id":i["sd48be64b7"],
                    "phone_number":i["s37e762ac3"],
                    "address":i["sb91047f0b"]["location_address"],
                    "can_text":i["s5d2aed3fd"],
                }
            }
            
            participant_list.append(data)  
            
    data=participant_list   
    
    return data


def participantspoints(request):
    pid=request.user.brewery
    participant_points=[]
    points_earned=[]
    unique_master_id=set()
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.active_trails
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    for i in response.json()["items"] :
        if i["title"]==pid:
            trail_name=i["s9b9447a8e"]
            trail_year=i["s157fa6cfb"]
            trail_season=i["s74aaea978"]
            trail_minitour=i["sd82de27d5"]
        
           
    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    for i in response.json()["items"]:
       
        if trail_name==i["sc270d76da"] and trail_year==i["scef57f448"] and trail_season==i["sd25a89828"] and trail_minitour==i["s56b038ef3"]:
                if i["s0d1c07938"] !="":
                    master_id1=i["s0d1c07938"]
                    unique_master_id.add(master_id1)
         
    # app_ids = settings.visit
    # response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    # for i in response.json()["items"] :
    #     if i["s9d5037e2f"]==pid :
            
    #             master_id1=i["s211c64472"]
    #             unique_master_id.add(master_id1)
                

    app_ids = settings.participants_points
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    

    
    for i in response.json()["items"]:
        if i["title"] in list(unique_master_id):
           
            if i["s1255e267e"]["count"]>0:
                data={
                    "master_id":i["title"],
                    "name_of_participants":i["s332210fbb"],
                    "points_earned":i["s1255e267e"]["count"],

                    "title_submenu":{
                        "master_id":i["title"],
                        "count":i["s1255e267e"]["count"],
                        "points_earned":[]
                    }
                    
                }
        
                for k in  range(i["s1255e267e"]["count"]):
                    if i["s1255e267e"]["items"][k]["s2193f87d0"]=="":
                        i["s1255e267e"]["items"][k]["s2193f87d0"]=0
                    if i["s1255e267e"]["items"][k]["s7cb0a4f31"]=="":
                        i["s1255e267e"]["items"][k]["s7cb0a4f31"]=0

                    
                    
        
                    data1={
                        
                        
                            "name":i["s1255e267e"]["items"][k]["name"],
                            "first_created":i["s1255e267e"]["items"][k]["first_created"]["on"],
                            "last_updated":i["s1255e267e"]["items"][k]["last_updated"]["on"],
                            "total_points":i["s1255e267e"]["items"][k]["s9e25e9aba"],
                            "points_earned":i["s1255e267e"]["items"][k]["s5dd95e7c3"],
                            "monthly_points":i["s1255e267e"]["items"][k]["s2193f87d0"],
                            "annual_points":i["s1255e267e"]["items"][k]["s7cb0a4f31"]
                            

                    }
                    
                
                    
                    points_earned.append(data1)

                    data["title_submenu"]["points_earned"].append(data1)    
           
                participant_points.append(data)  

    data= participant_points
  
    return data

def participantspoints_all(request,pid):
    participant_points=[]
    points_earned=[]
    unique_master_id=set()
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.active_trails
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    for i in response.json()["items"] :
        if i["title"]==pid:
            trail_name=i["s9b9447a8e"]
            trail_year=i["s157fa6cfb"]
            trail_season=i["s74aaea978"]
            trail_minitour=i["sd82de27d5"]
        
           
    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    for i in response.json()["items"]:
       
        if trail_name==i["sc270d76da"] and trail_year==i["scef57f448"] and trail_season==i["sd25a89828"] and trail_minitour==i["s56b038ef3"]:
                if i["s0d1c07938"] !="":
                    master_id1=i["s0d1c07938"]
                    unique_master_id.add(master_id1)
    # app_ids = settings.visit
    # response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    # unique_master_id=set()
    # for i in response.json()["items"] :
    #     if i["s9d5037e2f"]==pid :
            
    #             master_id1=i["s211c64472"]
    #             unique_master_id.add(master_id1)
                

    app_ids = settings.participants_points
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    

    
    for i in response.json()["items"]:
        if i["title"] in list(unique_master_id):
       
            if i["s1255e267e"]["count"]>0:
                data={
                    "master_id":i["title"],
                    "name_of_participants":i["s332210fbb"],
                    "points_earned":i["s1255e267e"]["count"],

                    "title_submenu":{
                        "master_id":i["title"],
                        "count":i["s1255e267e"]["count"],
                        "points_earned":[]
                    }
                    
                }
        
                for k in  range(i["s1255e267e"]["count"]):
                    
                    data1={
                        
                        
                            "name":i["s1255e267e"]["items"][k]["name"],
                            "first_created":i["s1255e267e"]["items"][k]["first_created"]["on"],
                            "last_updated":i["s1255e267e"]["items"][k]["last_updated"]["on"],
                            "total_points":i["s1255e267e"]["items"][k]["s9e25e9aba"],
                            "points_earned":i["s1255e267e"]["items"][k]["s5dd95e7c3"],
                            "monthly_points":i["s1255e267e"]["items"][k]["s2193f87d0"],
                            "annual_points":i["s1255e267e"]["items"][k]["s7cb0a4f31"]
                            

                    }
                                 
                    
                    points_earned.append(data1)

                    data["title_submenu"]["points_earned"].append(data1)    
            
                participant_points.append(data)  
          
    data= participant_points
    
    return data

def visit(request):
    pid=request.user.brewery
    visit_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id": settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.visit
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    for i in response.json()["items"]:
        if i["s9d5037e2f"]==pid:
            data={
                "title":i["title"],
                "master_participants_id":i["s211c64472"],
                "visit_date":i["s7bed21761"]["date"],
                "location_id":i["s9d5037e2f"],
                "rfid":i["sea475d5e4"],
                "title_submenu":{
                    "title":i["title"],
                    "master_participant_id":i["s211c64472"],
                    "visit_date":i["s7bed21761"]["date"],
                    "brewery_id":i["s63e787f85"],
                    "location_id":i["s9d5037e2f"],
                    "rfid":i["sea475d5e4"]

                }
            }

            visit_list.append(data)  
    data=visit_list  

    return data

def visit_all(request,pid):
    visit_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id": settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.visit
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    for i in response.json()["items"]:
        if i["s9d5037e2f"]==pid:
            data={
                "title":i["title"],
                "master_participants_id":i["s211c64472"],
                "visit_date":i["s7bed21761"]["date"],
                "location_id":i["s9d5037e2f"],
                "rfid":i["sea475d5e4"],
                "title_submenu":{
                    "title":i["title"],
                    "master_participant_id":i["s211c64472"],
                    "visit_date":i["s7bed21761"]["date"],
                    "brewery_id":i["s63e787f85"],
                    "location_id":i["s9d5037e2f"],
                    "rfid":i["sea475d5e4"]

                }
            }

            visit_list.append(data)  
    data=visit_list  

    return data


def active_trails(request):
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id": settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.active_trails

    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    return response




def counts(request,val):
    
    count=0
    count1=0
    count2=0
    count3=0
    count4=0
    count5=0

    for i in val:
        if i<=16.67:
            count=count+1
        if i>16.67 and i<=33.33:
            count1=count1+1 
        if i>33.33 and i<=50:
            count2=count2+1 
        if i>50 and i<=66.67:
            count3=count3+1 
        if i>66.67 and i<=83.33:
            count4=count4+1 
        if i>83.33 and i<=100:
            count5=count5+1 

    return count,count1,count2,count3,count4,count5


def age_counts(request,user_age):
    
    count=0
    count1=0
    count2=0
    count3=0
    count4=0
    count5=0
    count6=0

    for i in user_age:
        
        if i>=21 and i<=25:
            count=count+1
        if i>25 and i<=35:
            count1=count1+1 
        if i>35 and i<=45:
            count2=count2+1 
        if i>45 and i<=55:
            count3=count3+1 
        if i>55  and i<=65:
            count4=count4+1
        if i>65:
            count5=count5+1
        if i==0 or i< 0:
            count6=count6+1     
    
    return count,count1,count2,count3,count4,count5,count6


def gender_counts(request,gender_type):
   
    count=0
    count1=0
    count2=0
    count3=0
    count4=0
   

    for i in gender_type:
       
        if i=="Male" or i=="man" or i=="Man" or i=="male":
            count=count+1
        if i=="Female" or i=="woman" or i=="Woman" or i=="female":
            count1=count1+1 
        if i=="Transgender" or i=="Prefer not to say":
            count2=count2+1 
        if i=="Non-Binary/Non-Conforming":
            count3=count3+1 
        if i=="":
            count4=count4+1    
          
    return count,count1,count2,count3,count4



def get_all_sub_items(request):

    active_participants=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    # app_ids = settings.active_trails

    # response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    # app_ids = settings.trailmaster_id 
    # response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    trails_data=trailscomp(request)   
    active_trails_data=active_trails(request) 
    count=0
    for k in active_trails_data.json()["items"]:
        for i in trails_data:
            if  i["trail_name"] == k["s9b9447a8e"] :
                count=count+1
   
    # if response.status_code == 200:
    #     json_response = response.json()
    #     items = json_response.get('items', [])
    #     print(items)
 
    #     for item in items:
    #         sub_items = item.get("sb7210e570", {})
    #         active_participants.append(sub_items["count"])
            
    # else:
    #     raise Exception(f"Failed to fetch data from SmartSuite: {response.content}")
    
    return count


def calculate_growth(request,week_number):
    growth_percentage=0
    
    current_week=WeekParticipants.objects.filter(user_id=request.user.id,weeknumber=int(week_number)).values("participant")
    previous_week=WeekParticipants.objects.filter(user_id=request.user.id,weeknumber=int(week_number)-1).values("participant")
   
    if current_week and previous_week:
        growth_percentage=(int(current_week[0]["participant"])-int(previous_week[0]["participant"]))/int(previous_week[0]["participant"])
    return growth_percentage


def calculate_netchange(request,week_number):
    net_percentage=0

    current_week=WeekParticipants.objects.filter(user_id=request.user.id,weeknumber=int(week_number)).values("participant")
    previous_week=WeekParticipants.objects.filter(user_id=request.user.id,weeknumber=int(week_number)-1).values("participant")
    
    if current_week and previous_week:
        net_percentage=int(current_week[0]["participant"])-int(previous_week[0]["participant"])

    return net_percentage


def trail_participant(request,trails_data):
    count=0
    for trail in trails_data:
        if trail["is_solo_trail"]:
            count=count+1
            
   
        else:    
            for j in range(trail["breweries_completed"]):
                count=count+1
             
    participant={
            
            "paricipant_count":count
        }       
                    
            
          
    return participant



def urls_link(request):
    url_dict={}
    url_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.event 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    active_urls_linlk={urls["title"]:urls["s0576c7c42"] for urls in response.json()["items"] if urls["safb5bb2e0"] and int(urls["safb5bb2e0"])==int(request.user.brewery)}
    for i in active_urls_linlk:   
        url_dict={
            "event_name":i,
            "event_url":active_urls_linlk[i]
        }

        url_list.append(url_dict)

    return url_list 


def hottest_day(request):
    hottest_date=trailscomp(request)

    return hottest_date


def change_format(request,hottest_data):
    date_list=[]
    breweries_dict={}
    for date in hottest_data:
        for j in range(date["breweries_completed"]):
            if date["title_submenu"]["breweries_completed"][j]["date"]:

                input_string = date["title_submenu"]["breweries_completed"][j]["date"]

                datetime_object = datetime.datetime.fromisoformat(input_string.replace("Z", "+00:00"))
                formatted_datetime = datetime_object.strftime("%A")

        
                breweries_dict={
                    "breweries_completed":int(date["breweries_completed"]),
                    "hottest_day":formatted_datetime
                }

            date_list.append(breweries_dict)


    return date_list



def list_user(request):
    total_points={}
    points_earned={}
    monthly_points={}
    annual_points={}
    
    master_ids={}
    points_data=participantspoints(request)
    
    participants_data=participants(request)
   
    master_data=[master["master_id"] for master in participants_data]
    master_name=[master["full_name"] for master in participants_data]
   
    for points in points_data:

        
        if points["master_id"] in master_data and points["name_of_participants"] in master_name:
           
            for j in range(points["title_submenu"]["count"]):
                      
                
                                            
                    total_points[points["name_of_participants"]]=int(points["title_submenu"]["points_earned"][j]["total_points"])  
                    
                    points_earned[points["name_of_participants"]]=int(points["title_submenu"]["points_earned"][j]["points_earned"])  
                    
                    monthly_points[points["name_of_participants"]]=int(points["title_submenu"]["points_earned"][j]["monthly_points"])
                    
                    annual_points[points["name_of_participants"]]=int(points["title_submenu"]["points_earned"][j]["annual_points"])
                   
                    master_ids[points["name_of_participants"]] = int(points["master_id"])
                    
    top_10_total_points = sorted(zip(total_points.values(), total_points.keys(), master_ids.values()), reverse=True)
    bottom_10_total_points = sorted(zip(total_points.values(), total_points.keys(), master_ids.values()))

    top_10_points_earned = sorted(zip(points_earned.values(), points_earned.keys(), master_ids.values()), reverse=True)
    bottom_10_points_earned = sorted(zip(points_earned.values(), points_earned.keys(), master_ids.values()))   
    
    top_10_annual_points = sorted(zip(annual_points.values(), annual_points.keys(), master_ids.values()), reverse=True)
    bottom_10_annual_points = sorted(zip(annual_points.values(), annual_points.keys(), master_ids.values()))

    top_10_monthly_points = sorted(zip(monthly_points.values(), monthly_points.keys(), master_ids.values()), reverse=True)
    bottom_10_monthly_points = sorted(zip(monthly_points.values(), monthly_points.keys(), master_ids.values())) 

                        
    # top_user_overall = max(zip(total_points.values(), total_points.keys(),master_ids.values()))
    # bottom_user_overall = min(zip(total_points.values(), total_points.keys(),master_ids.values()))
    # top_points_earned=max(zip(points_earned.values(), points_earned.keys(),master_ids.values())) 
    # bottom_points_earned=min(zip(points_earned.values(), points_earned.keys(),master_ids.values()))
    data= [{ "top_user_overall": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in top_10_total_points],
            "bottom_user_overall": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in bottom_10_total_points],
            "top_points_earned": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in top_10_points_earned],
            "bottom_points_earned": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in bottom_10_points_earned],
            "top_monthly_points": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in top_10_monthly_points],
            "bottom_monthly_points": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in bottom_10_monthly_points],
            "top_annual_points": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in top_10_annual_points],
            "bottom_annual_points": [{"master_id": master_id, "participant": participant, "points": points} for points, participant, master_id in bottom_10_annual_points] 
            }]
 

    return data