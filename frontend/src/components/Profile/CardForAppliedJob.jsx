import { useSelector } from "react-redux";
import Button from "../../components/Button";
import axios from "axios";

function CardForAppliedJob({ data }) {
  const { theme } = useSelector((state) => state.theme);

  // Theme-adaptive styling
  const accentBar =
    theme === "light"
      ? "bg-gradient-to-b from-gray-200 to-gray-50"
      : "bg-gradient-to-b from-gray-700 to-gray-500";
  const floatingIconBorder =
    theme === "light" ? "border-gray-300" : "border-gray-600";
  const floatingIconBg =
    theme === "light" ? "bg-white" : "bg-gray-900";

  const handleDelete = () => {
    console.log(data)
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/api/application/delete/a/${data._id}`,
        {},
        { withCredentials: true }
      ).then((response)=>{
        console.log(response)
      }).catch((error)=>{
        console.log(error)
      })

  }

  return (
    <div
      className={`w-full max-w-full sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto relative border shadow-lg rounded-2xl
        px-4 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8 flex flex-col gap-6 transition-all
        hover:scale-101 hover:shadow-2xl group
        ${theme === "light" ? "border-gray-300 text-gray-800" : "border-gray-600 text-gray-200"}
      `}
    >
      {/* Side accent bar */}
      <div className={`absolute top-7 left-0 h-12 w-2 rounded-r-2xl ${accentBar} opacity-80`}></div>
      {/* Floating icon (responsive) */}
      <div
        className={`absolute  -top-7 left-6 sm:left-12 w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center rounded-full border
         ${floatingIconBorder} shadow ${floatingIconBg} group-hover:scale-110 transition-transform`}
      >
        <svg width="26" height="26" fill="none">
          <circle cx="13" cy="13" r="11" stroke="#aaa" strokeWidth="2" />
          <path d="M8 13l3 3 5-5" stroke="#777" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <h2 className="text-xl sm:text-xl font-bold leading-tight  tracking-tight">{data.title || "No Title"}</h2>
      <div className="text-base sm:text-lg font-semibold ">{data.name || "N/A"}</div>
      <div className="flex flex-col sm:flex-row flex-wrap gap-y-3 sm:gap-x-10 sm:gap-y-4 text-base  font-medium">
        <span>Type: <span className="font-normal">{data.Type || "N/A"}</span></span>
        <span>Location: <span className="font-normal">{data.place || "N/A"}</span></span>
        <span>Experience: <span className="font-normal">{data.experienceLevel || "N/A"}</span></span>
        <span>Salary: <span className="font-normal">{data.salary ? `₹${data.salary}` : "N/A"}</span></span>
      </div>
      <div className="flex justify-end ">
        <Button onClick={handleDelete}>Delete</Button>
      </div>
    </div>
  );
}

export default CardForAppliedJob
