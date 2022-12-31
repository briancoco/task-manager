import React from 'react'
import { Link } from 'react-router-dom'
import {BsCheckCircleFill, BsCheckCircle, BsPencilFill, BsFillTrashFill} from 'react-icons/bs'
const Tasks = ({task, handleDelete}) => {
  return (
    <div className='feed-task'>
      <div className='task-descrip'>
        <h3>{task.name.length <= 25 ? task.name : task.name.substring(0, 25) + '...'}</h3>
        <p>{task.description.length <= 25 ? task.description : task.description.substring(0, 25) + '...'}</p>
      </div>
      <div className='task-icons'>
        {task.completed ? <BsCheckCircleFill /> : <BsCheckCircle />}
        <Link to={`/tasks/edit/${task._id}`}><BsPencilFill /></Link>
        <button className='icon-btn' type='button' onClick={(e) => handleDelete(e, task._id)}><BsFillTrashFill /></button>
      </div>
    </div>
  )
}

export default Tasks