import React, { useState } from 'react'
import { searchPassport } from '../../utils/Api'
import { toast } from 'react-toastify'

const Username = () => {

  const [passport , setPassport] = useState("")
  const [username , setUsername] = useState("")

  const handlePassport =(e)=>{
    console.log(e.target.value)
    setPassport(e.target.value)
  }

  const handleSearch =()=>{
    console.log("passporttttttttttt", passport)
    searchPassport({
      passport : passport
    }).then((res)=>{
      console.log("responseeeeeeee", res)
      if(res?.code==200){
         setUsername(res?.data?.full_name)
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
        <h1>Name : {username? username : "Not Filled"}</h1>
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
