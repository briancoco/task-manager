import React from 'react'
import {useState} from 'react'
import {useParams} from 'react-router-dom'
const EditTask = ({tasks, setTasks, token, navigate}) => {
  //consist of a form in which the user can edit what they want about their post
  //when they submit it will call the handleEdit() function which will call a patch
  const {id} = useParams();
  const task = tasks.find((task) => task._id === id);
  const [editName, setEditName] = useState(task.name);
  const [editDescrip, setEditDescrip] = useState(task.description);
  const [editCompleted, setEditCompleted] = useState(task.completed);

  const handleEdit = async (e) => {
    //call patch req to backend api
    //if ok, update tasks state and return back to feed
    //if not okay, display error
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name: editName, description: editDescrip, completed: editCompleted})
      
      });
      if(response.ok) {
        const newTasks = tasks.map((task) => task._id === id ? {...task, name: editName, description: editDescrip, completed: editCompleted} : task);
        setTasks(newTasks)
        navigate('/tasks')
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  //find the task associated with this id and set the state for our states
  return (
    <div className='login-wrapper'>
      <div className='edit-border'>
        <h2>Edit</h2>
        <form className='edit-form' onSubmit={handleEdit}>
          <label htmlFor='edit-name'>Name</label>
          <input id='edit-name' type='text' value={editName} onChange={(e) => setEditName(e.target.value)} required></input>

          <label htmlFor='edit-descrip'>Description</label>
          <textarea id='edit-descrip' required value={editDescrip} onChange={(e) => setEditDescrip(e.target.value)}></textarea>

          <div>
          <label htmlFor='edit-completed'>Completed</label>
          <input id='edit-completed' type='checkbox' checked={editCompleted} onChange={() =>setEditCompleted(!editCompleted)}></input>
          </div>
          <button className='login-btn button edit-submit' type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default EditTask