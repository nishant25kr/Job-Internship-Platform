import React from 'react'
import JobCard from './CardforJob'

function ViewJob() {
    const [jobs, setJobs] = useState()
    
  return (
    <div className='flex'>
      <JobCard  job={job}/>
     
    </div>
  )
}

export default ViewJob
