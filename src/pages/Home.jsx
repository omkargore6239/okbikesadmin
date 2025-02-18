import React from 'react'
import ProjectStatistics from '../components/ProjectStatistics'
import Platforms from '../components/Platforms'
import ProjectCard from '../components/ProjectCard'

const projects = [
  {
    name: "Honda Shine",
    type: "Bike",
    date: "2025-02-20",
    members: ["John", "Mike", "Sara"],
    files: 3,
    progress: 45
  },
  {
    name: "Hero Splender",
    type: "Bike",
    date: "2025-02-18",
    members: ["Alice", "Bob", "Dave"],
    files: 4,
    progress: 70
  },
  {
    name: "Honda Activa",
    type: "Bike",
    date: "2025-02-17",
    members: ["Eve", "Liam", "Tom"],
    files: 5,
    progress: 30
  },
  {
    name: "Royal Enfield Classic 350 Rental",
    type: "Bike",
    date: "2025-02-16",
    members: ["Nina", "Tommy", "Ravi"],
    files: 2,
    progress: 60
  }
];

const Home = () => {
  return (
    <div className='p-5'>
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
        <ProjectStatistics />
        <Platforms />
        <ProjectStatistics />
        <Platforms />
      </div>

      {/* <div>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-lg font-semibold'>Current Rentals</h1>
          <p className='text-sm underline text-indigo-600'>See all</p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {
            projects && projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))
          }
        </div> */}
      {/* </div> */}

      {/* <div>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-lg font-semibold'>Upcoming Rentals</h1>
          <p className='text-sm underline text-indigo-600'>See all</p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {
            projects && projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))
          }
        </div>
      </div> */}

      <div>
        <div className='flex justify-between items-center py-4'>
          <h1 className='text-lg font-semibold'>Completed Rentals</h1>
          <p className='text-sm underline text-indigo-600'>See all</p>
        </div>

        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-8'>
          {
            projects && projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
