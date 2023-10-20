/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useIntl } from 'react-intl'
// import {KTIcon} from '../../../../helpers'
// import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import { SidebarMenuItem } from './SidebarMenuItem'
import { SidebarMenuItemWithSub } from './SidebarMenuItemWithSub'
import { KTIcon } from '../../../../helpers'
import { getUserLinks } from "../../../../../utils/Api";

const SidebarMenuMain = () => {
  const intl = useIntl()

  const [iframe, setIframe] = useState([]);

  const ids = iframe.map((url: string) => {
      const match = url.match(/id=([\w\d]+)/);
      return match ? match[1] : null;
  });

console.log("get id onlyyyyyyyyyyyyyy==================",ids);

  useEffect(() => {
    getlinkuser();
  }, []);

  const getlinkuser = () => {
    getUserLinks()
      .then((res) => {
        console.log("user link--------------", res);
        if (res.code == 200) {
          setIframe(res.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
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
      <SidebarMenuItemWithSub to='/lists' title='Lists' fontIcon='bi-archive' icon='bi bi-list-columns-reverse'>
        <SidebarMenuItem to='/lists/breweries' title='Breweries' hasBullet={true} />
        <SidebarMenuItem to='/lists/trails' title='Trails' hasBullet={true} />
        <SidebarMenuItem to='/lists/participants' title='Participants' hasBullet={true} />
        <SidebarMenuItem to='/lists/points' title='Participants Points' hasBullet={true} />
        <SidebarMenuItem to='/lists/visits' title='Visits' hasBullet={true} />

        
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/brewery-event' title='Brewery Event Submission & Support Hub' fontIcon='bi-archive' icon='bi bi-headset'>
        <SidebarMenuItem to='/brewery-event/special-event' title='Special Event Submission' hasBullet={true} />
        <SidebarMenuItem to='/brewery-event/feature-request' title='Feature Requests' hasBullet={true} />
        <SidebarMenuItem to='/brewery-event/report-bug' title='Report a Bug' hasBullet={true} />
      </SidebarMenuItemWithSub>

      <SidebarMenuItemWithSub to='/events' title='Events' fontIcon='bi-archive' icon='bi bi-calendar3'>
        {
          ids?.length > 0 ?
          ids?.map((item,i)=>{
            return(
              <SidebarMenuItem to={`/events/events-iframe/${item}`} title={`Event ${i+1}`} hasBullet={true} />
            )
          }):""
        }
      </SidebarMenuItemWithSub>

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
