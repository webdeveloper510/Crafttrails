/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useIntl } from 'react-intl'
// import {KTIcon} from '../../../../helpers'
// import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
// import { KTIcon } from '../../../../helpers'
import { getHistoricTrails, getUserLinks, getuserProfile } from "../../../../../utils/Api";

const SidebarMenuMain = () => {
  const intl = useIntl()

  const [data, setData] = useState([]);
  const [listShow , setListShow] = useState("")
  const [historic, setHistoric] = useState([])

  useEffect(() => {
    const status = localStorage.getItem("status")
    if(status !== "true"){
      getlinkuser();
    }    
    getuserdata()
    getTrailhistoric()
  }, []);

  const getuserdata = ()=>{
    getuserProfile().then((res)=>{
      console.log("get user by token =============", res)
      setListShow(res?.data?.[0]?.listshow)
    }).catch((error)=>{
      console.log(error)
    })
  }

  const getlinkuser = () => {
    getUserLinks()
      .then((res) => {
        console.log("user link--------------", res.data);
        if (res?.code == 200) {
          const val = res.data
          setData(val);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTrailhistoric = ()=>{
    getHistoricTrails().then((res)=>{
      console.log("get historic trails dataaaaaaaaaaaa", res)
      if(res.code == 200){
        setHistoric(res?.data)
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  const status = localStorage.getItem("status")

  return (
    <>
    {
      status == "true" ?
      <>
      <SidebarMenuItem
      to='/admin-dashboard'
      icon='element-11'
      title={intl.formatMessage({ id: 'Admin Dashboard' })}
      fontIcon='bi-app-indicator'
      />
      <SidebarMenuItem
      to='/user-list'
      icon='bi bi-list-columns-reverse'
      title={intl.formatMessage({ id: 'User List' })}
      fontIcon='bi-archive'
      />
      </>
      :
    <>
     <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'Trail Dashboard' })}
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItemWithSub to='/points' title='Historic Trails' fontIcon='bi-app-indicator' icon='element-11'>
      {
        historic?.length > 0 ?
        historic?.map((item)=>{
          return(
              <SidebarMenuItem to={`/points/historic-trails/${item.trail_name}`} title={item.trail_name} hasBullet={true} />
          )
        }):""
      }
      </SidebarMenuItemWithSub>
       <SidebarMenuItem
        to='/membership-dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'Membership Dashboard' })}
        fontIcon='bi-app-indicator'
      />
      {
        listShow == true ?
        <SidebarMenuItemWithSub to='/lists' title='View Raw Data' fontIcon='bi-archive' icon='bi bi-list-columns-reverse'>
        {/* <SidebarMenuItem to='/lists/breweries' title='Breweries' hasBullet={true} /> */}
        <SidebarMenuItem to='/lists/trails' title='Trails' hasBullet={true} />
        <SidebarMenuItem to='/lists/participants' title='Participants' hasBullet={true} />
        {/* <SidebarMenuItem to='/lists/points' title='Participants Points' hasBullet={true} /> */}
        {/* <SidebarMenuItem to='/lists/visits' title='Visits' hasBullet={true} /> */}
      </SidebarMenuItemWithSub>
      :""
      }
      {/* <SidebarMenuItemWithSub to='/lists' title='Overall Points' fontIcon='bi-archive' icon='bi bi-list-columns-reverse'>
        <SidebarMenuItem to='/lists/breweries' title='Breweries' hasBullet={true} />
        <SidebarMenuItem to='/lists/trails' title='Trails' hasBullet={true} />
        <SidebarMenuItem to='/lists/participants' title='Participants' hasBullet={true} />
        <SidebarMenuItem to='/lists/points' title='Participants Points' hasBullet={true} />
        <SidebarMenuItem to='/lists/visits' title='Visits' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      <SidebarMenuItemWithSub to='/brewery-event' title='Event Submission & Support Hub' fontIcon='bi-archive' icon='bi bi-headset'>
        <SidebarMenuItem to='/brewery-event/special-event' title='Special Event Submission' hasBullet={true} />
        <SidebarMenuItem to='/brewery-event/feature-request' title='Feature Requests' hasBullet={true} />
        <SidebarMenuItem to='/brewery-event/report-bug' title='Report a Bug' hasBullet={true} />
        <SidebarMenuItem to='/brewery-event/marketing-text' title='Marketing Text & Email Form' hasBullet={true} />
        <SidebarMenuItem to='/brewery-event/update-business' title='Update My Business' hasBullet={true} />

      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/username'
        icon='element-11'
        title={intl.formatMessage({ id: 'User Name' })}
        fontIcon='bi-app-indicator'
      />
      {/* <SidebarMenuItemWithSub to='/events' title='Events' fontIcon='bi-archive' icon='bi bi-calendar3'>
        {
          data?.length > 0 ?
          data?.map((event) => {
            const eventId = event.event_url.match(/id=(\w+)/)[1]
            return(
              <SidebarMenuItem to={`/events/events-iframe/${eventId}`} title={event.event_name} hasBullet={true} />
            )
           
          }):""
        }
      </SidebarMenuItemWithSub> */}
    </>
    }
     
      {/* <SidebarMenuItem
        to='/documentManager'
        icon='file'
        title={intl.formatMessage({ id: 'Doc Manager' })}
        fontIcon='bi-app-indicator'
      /> */}
      {/* <SidebarMenuItem
      to="/user-list"
      icon='profile-circle'
      title='Account'
      fontIcon='bi-person'
      /> */}
      {/* <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' /> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Lists</span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='element-plus'
      > */}
      

      {/* </SidebarMenuItemWithSub>  */}
      {/* <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-7'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-28'
        title='User management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export { SidebarMenuMain }
