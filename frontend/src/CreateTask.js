import React from 'react'

const CreateTask = () => {
    //form which contains task name, description, and button to toggle completed or not
    //to-do add name/description handling on the backend
    //currently can only take in task names
  return (
    <div className='create-wrapper'>
        <form className='create-form'>
            
            <label htmlFor='create-name'>Name</label>
            <input type='text' id='create-name' required></input>
        
        
            <label htmlFor='create-descrip'>Description</label>
            <textarea id='create-descrip' required></textarea>
        
            <div>
                <label htmlFor='create-compelted'>Completed</label>
                <input type='checkbox' id='create-completed'></input>
            </div>
            

        </form>
    </div>
  )
}

export default CreateTask