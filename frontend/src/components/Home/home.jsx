import axios from "axios"
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import Button from "../Button";

export default function Home() {

  const { user } = useSelector((state)=>state.auth)
  
  return (
    <div>
      <h1>This is Home</h1>
      <div className="">
        {user && <>Welocome "{user.username}"</>}
        {/* <AnimatedTestimonialsDemo /> */}
        <div>
        <Button
          type="submit"
          className=""
          bgColor="bg-black"
        >
          Login
        </Button>

        

        </div>

      </div>
    </div>
  );
}


