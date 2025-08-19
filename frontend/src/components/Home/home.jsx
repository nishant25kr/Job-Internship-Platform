import axios from "axios"
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import Button from "../Button";

export default function Home() {

  const { theme } = useSelector((state) => state.theme)

  return (
    <div>
      <div className="">
        {/* <AnimatedTestimonialsDemo /> */}
        <div
          className={`min-h-[70vh] 
        ${theme == 'dark' ? "bg-gradient-to-b from-black via-gray-800 via-gray-600 via-gray-800 to-black"
              :
              "bg-gradient-to-b from-white via-gray-200 via-gray-200 via-gray-200 to-white"
            }
        `}
        >
          
          {theme}

        </div>

      </div>
    </div>
  );
}


