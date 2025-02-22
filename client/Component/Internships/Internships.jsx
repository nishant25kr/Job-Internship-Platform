import React from 'react'
import { useState,useEffect } from 'react'

export default function Internships() {
    const[internships,setinterships]=useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/internships")  
          .then((response) => response.json())
          .then((data) => setinterships(data))
          .catch((error) => console.error("Error fetching jobs:", error));
      }, []);
    
  return (
    <>
    <div className="row">
        <div className="col-md-12">
            

        </div>
    </div>
    
    </>






    // <div>
    //   <h1>Intern</h1>
    //   <div className="text-light">
    //   <h1>Job Listings</h1>
    //   <ul>
    //     {internships.map((internships) => (
    //       <li key={internships._id}>
    //         <h2>{internships.title}</h2>
    //         <p>{internships.company}</p>
    //         <p>Salary: ${internships.stipend}</p>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    // </div>
  )
}
