/*eslint-disabled*/
// eslint-disable-next-line @typescript-eslint/no-unused-expressions

import { useState, useEffect } from "react";
import { Breadcrumb } from "react-bootstrap";
import { getBreweryAdmin } from "../../../utils/Api";

import DynamicTable from "../../table";

const BreweryTable = ({ passport }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open_modal, setOpenModal] = useState({ toggle: false, data: null });

  useEffect(() => {
    setLoading(true);
    getBreweryAdmin(passport)
      .then((res) => {
        setLoading(false);
        if (res.code === 200) {
          setList(res?.data);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);
  
  const arr = [];
  arr.push(list);
  const updatedData = arr.map(item => {
    return { ...item, dashboard: ""  };
  });
 
  return (
    <>
      <div>
        {/* <Breadcrumb>
          <Breadcrumb.Item href="#"><span style={{ color: "#000" }}>Lists</span></Breadcrumb.Item>
          <Breadcrumb.Item active><h1 style={{ color: "#ef305e" }}>Breweries</h1></Breadcrumb.Item>
        </Breadcrumb> */}
        <div>
        
          {loading ? (
            <div className="loader-overly">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {arr && arr.length > 0 ? (
                <DynamicTable data={updatedData} />
              ) : (
                "No Record Found!!"
              )}
            </>
          )}
        </div>
      </div>
      {/* <ModalView toggle={open_modal.toggle} handler={() => setOpenModal({ toggle: false, data: null })} data={open_modal.data} /> */}
    </>
  );
};

// const ModalView = ({ toggle, handler, data }) => {
//   const [content, setContent] = useState()

//   useEffect(() => {
//     if (data) {
//       setContent(data)
//     }
//     return () => {
//       setContent(null)
//     }
//   }, [data, toggle])

//   const drinkOptionDisplay = (val) => {
//     if (val?.length > 0) {
//       let text = val[0]
//       for (let i = 0; i < val.length; i++) {
//         text = text + "," + val[i]
//       }
//       return text
//     } else {
//       return "N/A"
//     }
//   }

//   return (
//     <>
//       <Modal show={toggle} size="lg" centered onHide={() => handler()}>
//         <Modal.Header className="bg-danger" >
//           <div className="d-grid">
//             <h5 className="text-light">Breweries/Distilleries</h5>
//             <span className="text-light display-6">{data?.title}</span>
//           </div>
//           <button className="button-close" onClick={() => handler()}><span class="material-symbols-outlined">
//             cancel
//           </span></button>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row my-3">
//             <div className="col-md-6 d-grid col-lg-6 col-sm-12">
//               <span className="fw-bold">TITLE</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.title || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">INDOOR SEATING</span>
//               <span className="display-6">{data?.indoor_seating === true ? (<CheckSquareFill color="green" />) : (<XSquareFill color={"red"} />)}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 d-grid col-lg-6 col-sm-12">
//               <span className="fw-bold">BREWERY NAME</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.brewery_name || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">OUTDOOR SEATING</span>
//               <span className="display-6">{data?.outdoor_seating === true ? (<CheckSquareFill color="green" />) : (<XSquareFill color={"red"} />)}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">CONTACT NAME</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.contact_name || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">KID FRIENDLY</span>
//               <span className="display-6">{data?.kid_friendly === true ? (<CheckSquareFill color="green" />) : (<XSquareFill color={"red"} />)}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">CONTACT EMAIL</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.contact_email[0] || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">DOG FRIENDLY</span>
//               <span className="display-6">{data?.dog_friendly === true ? (<CheckSquareFill color="green" />) : (<XSquareFill color={"red"} />)}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">NUMBER WHERE I CAN REACH YOU</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.reach_number[0] || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">SIGN-UP DATE</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.signup_date || "N/A"}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">LOGO</span>
//               {
//                 data?.logo?.length > 0 ?
//                   <img src={data?.logo[0]} height={64} width={64} />
//                   :
//                   <img src="/media/avatars/logo.png" height={64} width={64} />

//               }
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">BIO</span>
//               <span className="bg-secondary rounded ps-3 py-5">{data?.bio || "N/A"}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">CUSTOMER FACING PHONE</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.customer_facing_phone || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">ADDRESS</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.address?.sys_root || "N/A"}</span>
//             </div>
//           </div>
//           <div className="row my-5">
//             <div className="col-sm-12 d-grid">
//               <span className="fw-bold">PHOTOS OF ESTABLISHMENT</span>
//               {
//                 data?.establishment?.length > 0 ?
//                   <>
//                     {
//                       data?.establishment.map((item, index) => {
//                         return (
//                           <img key={index} src={item} />
//                         )
//                       })
//                     }
//                   </>
//                   :
//                   <img src="/media/avatars/logo.png" height={64} width={64} />

//               }
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">WEEKLY HOURS</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.weekly_hours || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">LIVE MUSIC</span>
//               <span className="display-6">{data?.have_live_music === true ? (<CheckSquareFill color="green" />) : (<XSquareFill color={"red"} />)}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">LIVE MUSIC TIMING</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.live_music_time || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">EVENT DURING TRAILS (DATE & TIME)</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.event || "N/A"}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">WEBSITE</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.website || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">DRINK OPTIONS</span>
//               <span className="bg-secondary rounded ps-3 py-2">{drinkOptionDisplay(data?.drink_option)}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">FACEBOOK URL</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.facebook_url[0] || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">INSTAGRAM URL</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.instagram_url[0] || "N/A"}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">UNTAPPD URL</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.untappd_url[0] || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">TWITTEER URL</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.twitter_url[0] || "N/A"}</span>
//             </div>
//           </div>
//           <div className="row my-5">
//             <div className="col-sm-12 d-grid">
//               <span className="fw-bold">PHOTOS OF DRINK</span>
//               {
//                 data?.photo_of_drink?.length > 0 ?
//                   <>
//                     {
//                       data?.photo_of_drink.map((item, index) => {
//                         return (
//                           <img key={index} src={item} />
//                         )
//                       })
//                     }
//                   </>
//                   :
//                   <img src="/media/avatars/logo.png" height={64} width={64} />

//               }
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">FOOD AVAILABLE</span>
//               <span className="display-6">{data?.live_music === true ? (<CheckSquareFill color="green" />) : (<XSquareFill color={"red"} />)}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">FOOD DESCRIPTION</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.food_description || "N/A"}</span>
//             </div>
//           </div>
//           <div className="row my-5">
//             <div className="col-sm-12 d-grid">
//               <span className="fw-bold">FOOD PHOTOS</span>
//               {
//                 data?.food_photos?.length > 0 ?
//                   <>
//                     {
//                       data?.food_photos.map((item, index) => {
//                         return (
//                           <img key={index} src={item} />
//                         )
//                       })
//                     }
//                   </>
//                   :
//                   <img src="/media/avatars/logo.png" height={64} width={64} />

//               }
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">EVENT LINK</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.event_calender || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">PUBLIC TOURS</span>
//               <span className="display-6">{data?.public_tour === true ? (<CheckSquareFill color="green" />) : (<XSquareFill color={"red"} />)}</span>
//             </div>
//           </div>
//           <div className="row my-3">
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">LINK TO TRAIL</span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.trail_link[0] || "N/A"}</span>
//             </div>
//             <div className="col-md-6 col-lg-6 col-sm-12 d-grid">
//               <span className="fw-bold">FORMULA </span>
//               <span className="bg-secondary rounded ps-3 py-2">{data?.formula || "N/A"}</span>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   )
// }

export default BreweryTable;
