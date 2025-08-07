import axios from "axios"
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo"
import { useEffect } from "react"


export default function Home() {

  const handlesubmit = () => {
    axios
      .get("http://localhost:8000/api/users/currentUser", {
        withCredentials: true,
      })
      .then((response) => {
        //  setUser(response.data.user);
        console.log(response)
      })
      .catch((error) => {
        console.log("Error", error)
      })

  }

  useEffect(()=>{
    const User = JSON.parse(localStorage.getItem("user"));
    if(User){
      console.log(User)
    }
    else{
      console.log("user not found")
    }

  },[])


  return (
    <div>
      <h1>This is Home</h1>
      <div className="border">
        <AnimatedTestimonialsDemo />

      </div>
      <button onClick={handlesubmit}>getUser</button>
    </div>
  );
}


