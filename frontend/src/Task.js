import React from 'react'
import { useParams, Link } from 'react-router-dom';
import {BsArrowLeftSquareFill} from 'react-icons/bs';
const Task = ({ tasks }) => {
  //get the id from our route param
  //find task associated with id
  //display task info
  const {id} = useParams();
  const task = tasks ? tasks.find((task) => task._id === id) : null;
  return (
    <>
    {task ? <div className='task'>
      <div>
        <h1>{task.name}</h1>
        <p>
          {task.description}
        </p>
      </div>
      <Link to='/tasks'><BsArrowLeftSquareFill size='1.8em'/></Link>
    </div>
    :
    <div className='login-invalid'>Task not found</div>
    }
    </>
  )
}

export default Task