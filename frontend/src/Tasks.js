import React from 'react'

const Tasks = ({task}) => {
  return (
    <div className='feed-task'>
      <h5>{task.description.length <= 25 ? task.description : task.description.substring(0, 25) + '...'}</h5>
      <h5>{`completed: ${task.completed}`}</h5>
    </div>
  )
}

export default Tasks