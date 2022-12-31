import React from 'react'
import Tasks from './Tasks';
import {Link} from 'react-router-dom';
const Feed = ({tasks, isLoading, handleDelete}) => {
  //use fetch api to get all of the tasks associated with this user
  //then use array.map to display those results. 

  return (
    <div className='feed'>
      {isLoading && <div>Loading...</div>}
      {!isLoading && !tasks && 
        <div>
          <h5>Please try again</h5>
          <Link to='/login'>Login</Link>
        </div>
      }
      
      {!isLoading && tasks && tasks.length > 0 && <div className='feed-tasks'>{tasks.map((task) => <Tasks key={task._id} task={task} handleDelete={handleDelete}/>)}</div> }
      {!isLoading && tasks && tasks.length === 0 && <div>No tasks to be displayed</div>}
    
    </div>
  )
}

export default Feed