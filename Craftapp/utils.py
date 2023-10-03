from CraftTrails import settings
import requests




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
    
    for i in response.json()["items"]:
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
                "logo":i["sa24832ad2"],
                
            
                
            }
        }
        breweries_list.append(data)  
    data=breweries_list
    return breweries_list



def trails(request):
    trail_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.trailmaster_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
 
    for i in response.json()["items"]:

        
        if i["sb7210e570"]["count"]>0:
            data={
                
                "title":i["title"],
                "application_id":i["id"],
                "participant_id":i["s99187d139"],
                "trail_name":i["sc270d76da"],
                "trail_year":i["scef57f448"],
                "trail_season":i["sd25a89828"],
                "mini_tour":i["s56b038ef3"], 
                "master_id":i["s0d1c07938"],  
                "breweries_completed":i["sb7210e570"]["count"],
                "title_submenu":{
                    "title":i["title"],
                    "participant_id":i["s99187d139"],
                    "trail_name":i["sc270d76da"],
                    "trail_year":i["scef57f448"],  
                    "trail_season":i["sd25a89828"],
                    "mini_tour":i["s56b038ef3"],
                    "link__breweries":i["s24c712a83"],
                    "breweries_completed":{
                        "count":i["sb7210e570"]["count"],
                        "name":i["sb7210e570"]["items"][0]["name"],
                        "date":i["sb7210e570"]["items"][0]["date"]["date"]
                    
                    }


                } 
            }
        else:
            data={
                
                "title":i["title"],
                "application_id":i["id"],
                "participant_id":i["s99187d139"],
                "trail_name":i["sc270d76da"],
                "trail_year":i["scef57f448"],
                "trail_season":i["sd25a89828"],
                "mini_tour":i["s56b038ef3"], 
                "master_id":i["s0d1c07938"],  
                "title_submenu":{
                    "title":i["title"],
                    "participant_id":i["s99187d139"],
                    "trail_name":i["sc270d76da"],
                    "trail_year":i["scef57f448"],  
                    "trail_season":i["sd25a89828"],
                    "mini_tour":i["s56b038ef3"],
                    "link__breweries":i["s24c712a83"],
                    "breweries_completed":{
                        "count":i["sb7210e570"]["count"],
                    
                    }


                } 
            }
        
        trail_list.append(data)  
        
    data=trail_list     
    return data

def participants(request):
    participant_list=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id": settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.participants_id 
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    
    for i in response.json()["items"]:
        if i["s37e762ac3"]:
            data={
                "title":i["title"],
                "rfid_tag":i["sbb8fea034"],
                "full_name":i["s37af43f83"]["sys_root"],
                "email":i["sac950cfcc"][0],
                "date_of_birth":i["sac87d276d"]["date"],
                "master_id":i["sd48be64b7"], 
                "phone_number":i["s37e762ac3"][0]["sys_title"],  
                "address":i["sb91047f0b"]["location_address"],
                "title_submenu":{
                    "title":i["title"],
                    "record_id":i["sfb74e1363"],
                    "rfid_tag":i["sbb8fea034"],
                    "email":i["sac950cfcc"],
                    "full_name":i["s37af43f83"]["sys_root"],
                    "date_of_birth":i["sac87d276d"]["date"],
                    "master_id":i["sd48be64b7"],
                    "phone_number":i["s37e762ac3"],
                    "address":i["sb91047f0b"]["location_address"],
                    "can_text":i["s5d2aed3fd"],
                }
            }

        else:
            data={
                "title":i["title"],
                "rfid_tag":i["sbb8fea034"],
                "full_name":i["s37af43f83"]["sys_root"],
                "email":i["sac950cfcc"][0],
                "date_of_birth":i["sac87d276d"]["date"],
                "master_id":i["sd48be64b7"], 
                "phone_number":"",  
                "address":i["sb91047f0b"]["location_address"],
                "title_submenu":{
                    "title":i["title"],
                    "record_id":i["sfb74e1363"],
                    "rfid_tag":i["sbb8fea034"],
                    "email":i["sac950cfcc"],
                    "full_name":i["s37af43f83"]["sys_root"],
                    "date_of_birth":i["sac87d276d"]["date"],
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
    participant_points=[]
    base_url = settings.base_url
    headers = {
        "Authorization": settings.authorization,
        "Account-Id":  settings.account_id,
        "Content-Type": "application/json"
    }
    app_ids = settings.participants_points
    response = requests.post(f"{base_url}/{app_ids}/records/list/", headers=headers, json={"hydrated": True})
    

   
    for i in response.json()["items"]:
        
       
        if i["s1255e267e"]["count"]>0:
            data={
                "master_id":i["title"],
                "name_of_participants":i["s332210fbb"],
                "points_earned":i["s1255e267e"]["count"],
                "title_submenu":[]
                
            }
     
            for k in  range(i["s1255e267e"]["count"]):
                data1={
                        
                        "master_id":i["title"],
                        "points_earned":{
                        "count":i["s1255e267e"]["count"],
                        "name":i["s1255e267e"]["items"][k]["name"],
                        "first_created":i["s1255e267e"]["items"][k]["first_created"]["on"],
                        "last_updated":i["s1255e267e"]["items"][k]["last_updated"]["on"],
                        "total_points":i["s1255e267e"]["items"][k]["s9e25e9aba"],
                        "points_earned":i["s1255e267e"]["items"][k]["s5dd95e7c3"]

                }
                }
                data["title_submenu"].append(data1)    
            participant_points.append(data)  
          
        else:
            
            data={
                "master_id":i["title"],
                "name_of_participants":i["s332210fbb"],
                "points_earned":i["s1255e267e"]["count"],
                "title_submenu":{
                    "master_id":i["title"],
                    "points_earned":{
                    "count":i["s1255e267e"]["count"],
                }
            }

            }
            participant_points.append(data)  
  
    data= participant_points
  

   
    return data


def visit(request):
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