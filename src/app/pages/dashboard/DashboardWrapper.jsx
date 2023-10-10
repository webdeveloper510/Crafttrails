/* eslint-disable jsx-a11y/anchor-is-valid */
import { useIntl } from 'react-intl'
import { toAbsoluteUrl } from '../../../_metronic/helpers'
import { PageTitle } from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'
import ActiveUserCount from './ActiveUserCount'
import PieChart from './PieChart'
import { useEffect, useState } from 'react'
import { getBreweryName } from '../../../utils/Api'

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
        <span className='display-5'>{name}</span>
      </div>
      <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
          <ActiveUserCount />
        </div>
        <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
          <PieChart className={' mb-5 mb-xl-10'} />
        </div>
        <div className='col-xxl-6'>
          <EngageWidget10 className='h-md-100' />
        </div>
      </div>
      <div className='row gx-5 gx-xl-10'>
        <div className='col-xxl-6 mb-5 mb-xl-10'>
        </div>
        <div className='col-xxl-6 mb-5 mb-xl-10'>
        </div>
      </div>
      <div className='row gy-5 gx-xl-8'>
        <div className='col-xxl-4'>
          <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
        </div>
        <div className='col-xl-8'>
          <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
        </div>
      </div>
      <div className='row gy-5 g-xl-8'>
        <div className='col-xl-4'>
          <ListsWidget2 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-4'>
          <ListsWidget6 className='card-xl-stretch mb-xl-8' />
        </div>
        <div className='col-xl-4'>
          <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
        </div>
      </div>
      <div className='row g-5 gx-xxl-8'>
        <div className='col-xxl-4'>
          <MixedWidget8
            className='card-xxl-stretch mb-xl-3'
            chartColor='success'
            chartHeight='150px'
          />
        </div>
        <div className='col-xxl-8'>
          <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
        </div>
      </div>
    </>
  )
}

const DashboardWrapper = () => {
  const intl = useIntl()
  return (
    <div className='wrapper'>
      <DashboardPage />
    </div>
  )
}

export { DashboardWrapper }
