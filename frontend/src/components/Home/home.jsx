import axios from "axios"
import { AnimatedTestimonialsDemo } from "./AnimatedTestimonialsDemo"
import { useEffect } from "react"
import { useSelector } from "react-redux";
import Button from "../Button";

export default function Home() {

  const { theme } = useSelector((state) => state.theme)

  return (
    <div
      className={`${theme === "dark"
        ? "border-gray-700 text-gray-300"
        : "border-gray-300 text-gray-800"
        }
                         min-h-[80vh] border-2 m-3 rounded-3xl`}>
      <div className={`items-center justify-center `}>
        {/* <AnimatedTestimonialsDemo /> */}
        <p className="text-7xl  text-center">Easy and fast way for you <br /> to get <span className={`${theme === "dark"
          ? "bg-gradient-to-r from-slate-800 via-purple-800 to-indigo-900"
          : "bg-gradient-to-r from-slate-400 via-purple-400 to-indigo-400 " 
          } bg-clip-text text-transparent`}>Dream</span>  Job</p>

      </div>
    </div>
  );
}


