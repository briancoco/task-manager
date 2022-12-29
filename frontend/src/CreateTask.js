import React from 'react'
import {useState} from 'react'
const CreateTask = ({ navigate, setTasks, tasks}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [validTask, setValidTask] = useState(true);

    const handleCreate = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      let response = await fetch('http://localhost:3000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({name, description, completed})
      });

      if(response.ok) {
        response = await response.json();
        if(tasks) {
          setTasks([...tasks, response.task]);
        } else {
          setTasks([response.task]);
        }
        navigate('/tasks')
      } else {
        setValidTask(false);
      }
    }

  return (
    <>
    {!validTask && <div className='login-invalid'>Error, try again.</div>}
    
    <div className='create-wrapper'>
        <form className='create-form' onSubmit={handleCreate}>
            
            <label htmlFor='create-name'>Name</label>
            <input type='text' id='create-name' value={name} onChange={(e) => setName(e.target.value)} required></input>
        
        
            <label htmlFor='create-descrip'>Description</label>
            <textarea id='create-descrip' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        
            <div>
              <label htmlFor='create-completed'>Completed</label>
              <input type='checkbox' id='create-completed' name='completed' value={completed} onClick={() =>setCompleted(!completed)}></input>
            </div>
            <button className='create-submit' type='submit'>Create</button>

        </form>
    </div>
    </>
  )
}

export default CreateTask