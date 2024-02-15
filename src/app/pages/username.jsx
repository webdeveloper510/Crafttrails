import React, { useState } from 'react'
import { searchPassport } from '../../utils/Api'
import { toast } from 'react-toastify'

const Username = () => {

  const [passport , setPassport] = useState("")
  const [username , setUsername] = useState("")
  const [show, setShow] = useState(false)

  const handlePassport =(e)=>{
    setPassport(e.target.value)
  }

  const handleSearch =()=>{
    searchPassport({
      passport : passport
    }).then((res)=>{
      if(res?.code==200){
         setUsername(res?.data?.full_name)
         setShow(true)
      }else {
        toast.error("Passport number not found", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
        })
        setUsername(" ")
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <div>
      <div>
        {
          show == true ?
          <h1>Name : {username? username : "Not Filled"}</h1>
          :
          ""
         }
      </div>  
       <div className='mt-5'>
        <h3 style={{color:"black"}}>Enter your passport</h3>
        <input placeholder='Enter your passport' style={{border:"1px solid lightgray", padding:"10px 20px", borderRadius:"10px"}} type='text' value={passport} onChange={(e)=>handlePassport(e)} />
        <button style={{display:"block", marginTop:"10px", border:"2px solid black", color:"black", backdropFilter:"white", padding:"10px 20px", borderRadius:"10px", fontWeight:600, fontSize:"14px"}} onClick={()=>handleSearch()}>Search</button>
       </div>
    </div>
  )
}

export default Username
