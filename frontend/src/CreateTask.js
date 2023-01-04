import React from 'react'
import {useState} from 'react'
const CreateTask = ({ navigate, setTasks, tasks}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [completed, setCompleted] = useState(false);
    const [error, setError] = useState(null);

    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        if(!token) {
          throw new Error('Please login first!');
        }
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
          setError(null);
          navigate('/tasks')
        } else {
          throw Error('Error, try again');
        }
      } catch (error) {
        console.log(error.message);
        setError(error.message);
      }
      
    }

  return (
    <>
    {error && <div className='login-invalid'>{error}</div>}
    
    <div className='login-wrapper'>
      <div className='edit-border'>
        <h2>Create</h2>
        <form className='edit-form' onSubmit={handleCreate}>
            
            <label htmlFor='create-name'>Name</label>
            <input type='text' id='create-name' value={name} onChange={(e) => setName(e.target.value)} required></input>
        
        
            <label htmlFor='create-descrip'>Description</label>
            <textarea id='create-descrip' value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        
            <div>
              <label htmlFor='create-completed'>Completed</label>
              <input type='checkbox' id='create-completed' name='completed' value={completed} onClick={() =>setCompleted(!completed)}></input>
            </div>
            <button className='login-btn button create-submit' type='submit'>Create</button>

        </form>
      </div>
    </div>
    </>
  )
}

export default CreateTask