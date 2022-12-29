import React from 'react'
import {BsCheckCircleFill, BsCheckCircle, BsPencilFill, BsFillTrashFill} from 'react-icons/bs'
const Tasks = ({task}) => {
  return (
    <div className='feed-task'>
      <div className='task-descrip'>
        <h3>{task.name.length <= 25 ? task.name : task.name.substring(0, 25) + '...'}</h3>
        <p>{task.description.length <= 25 ? task.description : task.description.substring(0, 25) + '...'}</p>
      </div>
      <div className='task-icons'>
        {task.completed ? <BsCheckCircleFill /> : <BsCheckCircle />}
        <BsPencilFill />
        <BsFillTrashFill />
      </div>
    </div>
  )
}

export default Tasks