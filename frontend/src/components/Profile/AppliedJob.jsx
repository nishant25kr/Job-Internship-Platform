import React from 'react'
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'

function AppliedJob() {

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.post(`http://localhost:8000/api/application/get-Application`,{ withCredentials: true })
      .then((response)=>{
        console.log(response)
      })
      .catch((error)=>[
        console.log(error.message)
      ])
  
    
  },)
  

  
  return (
    <div>
      this is applied job
    </div>
  )
}

export default AppliedJob
