
import ActiveUserCount from "./ActiveUserCount";
import PieChart from "./userCompletion";
import { useEffect, useState } from "react";
import { getBreweryName } from "../../../utils/Api";
import Piechart2 from "./userAge";
import RegisterUser from "./charts/userregister";
import WeeklyGrowth from "./charts/weeklyGrowth";
import NetChanges from "./charts/netchange";
import WeeklyData from "./charts/weekly";
import ParticipantCount from "./charts/participant";
import { useNavigate } from "react-router-dom";
import Usergender from "./charts/Gender";
import Loyality from "./charts/loyality";
// import Hottestday from "./charts/hottestday";

const DashboardPage = () => {


  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [loyality, setLoyality] = useState("Loyalty")

  useEffect(() => {
    const status = localStorage.getItem("status")
    if(status == "true"){
      navigate("/admin-dashboard")     
    }

    setLoading(true);
    getBreweryName().then((res) => {
      setLoading(false)
      if (res.code === 200) {
        setName(res?.data?.bar_name);
      }
    }).catch((error)=>{
      setLoading(false)
    })
  }, [loyality]);

  const handlePoints=(name)=>{
    setLoyality(name)
  }

  
  return (
    <>
      {loading ? (
        <div className="loader-overly">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="row">
            <h1 className="display-6 mb-5 pb-4 text-center">{name}</h1>
            <div className="text-center mb-5 pb-4">
              <button className="butns-dash" onClick={()=>handlePoints("Loyalty")}>Loyalty</button>
              <button className="butns-dash" onClick={()=>handlePoints("Birthday")}>Birthday</button>
              <button className="butns-dash" onClick={()=>handlePoints("Special_Trail")}>Special Trail</button>
            </div>
          </div>
          <div className="row g-5 g-xl-10 mb-5 mb-xl-10">
          {/* <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-md-5 mb-xl-10">
              <Loyality loyality={loyality}/>
            </div> */}
            <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 mb-md-5 mb-xl-10">
              <ActiveUserCount  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <PieChart  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <RegisterUser  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <Piechart2  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <Usergender  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <WeeklyData  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <WeeklyGrowth  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <NetChanges  loyality={loyality}/>
            </div>
            <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-md-5 mb-xl-10">
              <ParticipantCount  loyality={loyality}/>
            </div>
          </div>
        </>
      )}

      {/* <div className="row gx-5 gx-xl-10">
        <div className="col-xxl-6 mb-5 mb-xl-10"></div>
        <div className="col-xxl-6 mb-5 mb-xl-10"></div>
      </div>
      <div className="row gy-5 gx-xl-8">
        <div className="col-xxl-4">
          <ListsWidget3 className="card-xxl-stretch mb-xl-3" />
        </div>
        <div className="col-xl-8">
          <TablesWidget10 className="card-xxl-stretch mb-5 mb-xl-8" />
        </div>
      </div>
      <div className="row gy-5 g-xl-8">
        <div className="col-xl-4">
          <ListsWidget2 className="card-xl-stretch mb-xl-8" />
        </div>
        <div className="col-xl-4">
          <ListsWidget6 className="card-xl-stretch mb-xl-8" />
        </div>
        <div className="col-xl-4">
          <ListsWidget4 className="card-xl-stretch mb-5 mb-xl-8" items={5} />
        </div>
      </div>
      <div className="row g-5 gx-xxl-8">
        <div className="col-xxl-4">
          <MixedWidget8
            className="card-xxl-stretch mb-xl-3"
            chartColor="success"
            chartHeight="150px"
          />
        </div>
        <div className="col-xxl-8">
          <TablesWidget5 className="card-xxl-stretch mb-5 mb-xxl-8" />
        </div>
      </div> */}
    </>
  );
};

const DashboardWrapper = () => {
  return (
    <div className="wrapper">
      <DashboardPage />
    </div>
  );
};

export { DashboardWrapper };

// import {FC} from 'react'
// import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../../_metronic/helpers'
// import {PageTitle} from '../../../_metronic/layout/core'
// import {
//   ListsWidget2,
//   ListsWidget3,
//   ListsWidget4,
//   ListsWidget6,
//   TablesWidget5,
//   TablesWidget10,
//   MixedWidget8,
//   CardsWidget7,
//   CardsWidget17,
//   CardsWidget20,
//   ListsWidget26,
//   EngageWidget10,
// } from '../../../_metronic/partials/widgets'

// const DashboardPage = () => (
//   <>
//     {/* begin::Row */}
//     <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
//       {/* begin::Col */}
//       <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
//         <CardsWidget20
//           className='h-md-50 mb-5 mb-xl-10'
//           description='Active Projects'
//           color='#F1416C'
//           img={toAbsoluteUrl('/media/patterns/vector-1.png')}
//         />
//         <CardsWidget7
//           className='h-md-50 mb-5 mb-xl-10'
//           description='Professionals'
//           icon={false}
//           stats={357}
//           labelColor='dark'
//           textColor='gray-300'
//         />
//       </div>
//       {/* end::Col */}

//       {/* begin::Col */}
//       <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
//         <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' />
//         <ListsWidget26 className='h-lg-50' />
//       </div>
//       {/* end::Col */}

//       {/* begin::Col */}
//       <div className='col-xxl-6'>
//         <EngageWidget10 className='h-md-100' />
//       </div>
//       {/* end::Col */}
//     </div>
//     {/* end::Row */}

//     {/* begin::Row */}
//     <div className='row gx-5 gx-xl-10'>
//       {/* begin::Col */}
//       <div className='col-xxl-6 mb-5 mb-xl-10'>
//         {/* <app-new-charts-widget8 cssclassName="h-xl-100" chartHeight="275px" [chartHeightNumber]="275"></app-new-charts-widget8> */}
//       </div>
//       {/* end::Col */}

//       {/* begin::Col */}
//       <div className='col-xxl-6 mb-5 mb-xl-10'>
//         {/* <app-cards-widget18 cssclassName="h-xl-100" image="./assets/media/stock/600x600/img-65.jpg"></app-cards-widget18> */}
//       </div>
//       {/* end::Col */}
//     </div>
//     {/* end::Row */}

//     {/* begin::Row */}
//     <div className='row gy-5 gx-xl-8'>
//       <div className='col-xxl-4'>
//         <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
//       </div>
//       <div className='col-xl-8'>
//         <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
//       </div>
//     </div>
//     {/* end::Row */}

//     {/* begin::Row */}
//     <div className='row gy-5 g-xl-8'>
//       <div className='col-xl-4'>
//         <ListsWidget2 className='card-xl-stretch mb-xl-8' />
//       </div>
//       <div className='col-xl-4'>
//         <ListsWidget6 className='card-xl-stretch mb-xl-8' />
//       </div>
//       <div className='col-xl-4'>
//         <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
//         {/* partials/widgets/lists/_widget-4', 'class' => 'card-xl-stretch mb-5 mb-xl-8', 'items' => '5' */}
//       </div>
//     </div>
//     {/* end::Row */}

//     <div className='row g-5 gx-xxl-8'>
//       <div className='col-xxl-4'>
//         <MixedWidget8
//           className='card-xxl-stretch mb-xl-3'
//           chartColor='success'
//           chartHeight='150px'
//         />
//       </div>
//       <div className='col-xxl-8'>
//         <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
//       </div>
//     </div>
//   </>
// )

// const DashboardWrapper = () => {
//   const intl = useIntl()
//   return (
//     <>
//       <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
//       <DashboardPage />
//     </>
//   )
// }

// export {DashboardWrapper}
