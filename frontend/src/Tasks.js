import React from 'react'
import { Link } from 'react-router-dom'
import {BsCheckCircleFill, BsCheckCircle, BsPencilFill, BsFillTrashFill} from 'react-icons/bs'
const Tasks = ({tasks, task, setTasks, token}) => {
  const handleDelete = async (e, id) => {
    //using the given task id and the token saved in our state, create a delete 
    //request to our backend api passing in our token in the header and passing in
    //the id into the request url
    //if response is good then filter out the deleted request from our task state
    //if not good then display error to screen.

    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(response.ok) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='feed-task'>
      <div className='task-descrip'>
        <Link to={`/tasks/${task._id}`}><h3>{task.name.length <= 25 ? task.name : task.name.substring(0, 25) + '...'}</h3></Link>
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