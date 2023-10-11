/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useIntl } from 'react-intl'
// import { toAbsoluteUrl } from '../../../_metronic/helpers'
// import { PageTitle } from '../../../_metronic/layout/core'
// import {
//   ListsWidget2,
//   ListsWidget3,
//   ListsWidget4,
//   ListsWidget6,
//   TablesWidget5,
//   TablesWidget10,
//   MixedWidget8,
//   // CardsWidget7,
//   // CardsWidget17,
//   // CardsWidget20,
//   // ListsWidget26,
//   EngageWidget10,
// } from '../../../_metronic/partials/widgets'
import ActiveUserCount from './ActiveUserCount'
import PieChart from './userCompletion'
import { useEffect, useState } from 'react'
import { getBreweryName } from '../../../utils/Api'
import Piechart2 from './userAge'
// import PieChart3 from './charts/user'

const DashboardPage = () => {

  const [name, setName] = useState("N/A")

  useEffect(() => {
    getBreweryName().then(res => {
      console.log(res)
      if (res.code === 200) {
        setName(res?.data?.bar_name)
      }
    })
  }, [])

  return (
    <>
      <div className='row'>
        <span className='display-6 mb-5 pb-4 text-center'>{name}</span>
      </div>
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10'>
          <ActiveUserCount />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10' >
          <PieChart  />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10' >
          <Piechart2  />
        </div>
        {/* <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10' >
          <PieChart3  />
        </div> */}
        {/* <div className='col-xxl-6'>
          <EngageWidget10 className='h-md-100' />
        </div> */}
      </div>
      <div className='row gx-5 gx-xl-10'>
        <div className='col-xxl-6 mb-5 mb-xl-10'>
        </div>
        <div className='col-xxl-6 mb-5 mb-xl-10'>
        </div>
      </div>
    
    </>
  )
}

const DashboardWrapper = () => {
  // const intl = useIntl()
  return (
    <div className='wrapper'>
      <DashboardPage />
    </div>
  )
}

export { DashboardWrapper }
