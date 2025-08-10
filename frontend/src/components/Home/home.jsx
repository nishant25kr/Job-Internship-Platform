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

  const handleLogoutsubmit = async () =>{
    await auth.logOut()
  }


  return (
    <div>
      <h1>This is Home</h1>
      <div className="">
        {/* <AnimatedTestimonialsDemo /> */}

      </div>
    </div>
  );
}


