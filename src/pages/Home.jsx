import React from 'react'
import ProjectStatistics from '../components/ProjectStatistics'
import Platforms from '../components/Platforms'
import ProjectCard from '../components/ProjectCard'

const projects=[
  {
    name:"pratik",
    type:"website",
    date:"2024-03-15",
    members:["Shree","Dhanu","Bob"],
    files:5,
    progress:23
  },
  {
    name:"pratik",
    type:"website",
    date:"2024-03-15",
    members:["Shree","Dhanu","Bob"],
    files:5,
    progress:23
  },
  {
    name:"pratik",
    type:"website",
    date:"2024-03-15",
    members:["Shree","Dhanu","Bob"],
    files:5,
    progress:23
  },
  {
    name:"pratik",
    type:"website",
    date:"2024-03-15",
    members:["Shree","Dhanu","Bob"],
    files:5,
    progress:23
  }
]

const Home = () => {
  return (
    <div className='p-5'>
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
      <ProjectStatistics/>
      <Platforms/>
      <ProjectStatistics/>
      <Platforms/>
      </div>

      <div>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-lg font-semibold'>Current Working</h1>
          <p className='text-sm underline text-indigo-600'>See all</p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {
            projects && projects.map((project)=> <ProjectCard project={project}/>)
          }
        </div>
      </div>

      <div>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-lg font-semibold'>Current Working</h1>
          <p className='text-sm underline text-indigo-600'>See all</p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {
            projects && projects.map((project)=> <ProjectCard project={project}/>)
          }
        </div>
      </div>

      <div>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-lg font-semibold'>Current Working</h1>
          <p className='text-sm underline text-indigo-600'>See all</p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {
            projects && projects.map((project)=> <ProjectCard project={project}/>)
          }
        </div>
      </div>

      
    </div>
  )
}

export default Home