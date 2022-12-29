import React from 'react'
import {FaReact, FaNodeJs, FaServer} from 'react-icons/fa';
import {DiMongodb} from 'react-icons/di';
const Home = () => {
    //description of the application
    //then a list of the teck stack
  return (
    <div className='home'>
        <p>
            Fullstack web application for task management
        </p>
        <div className='home-lists'>
            <div className='features-wrapper'>
                <h5 className='list-header'>Features</h5>
                <ul>
                    <li>Task CRUD operations</li>
                    <li>User Authentication</li>
                    <li>Hashing</li>
                    <li>Session Management</li>
                    <li>Error Handling</li>
                </ul>
            </div>
            <div className='tech-wrapper'>
                <h5 className='list-header'>Technologies</h5>
                <ul>
                    <li><FaReact/>React.js</li>
                    <li><FaNodeJs />Node.js</li>
                    <li><FaServer />Express.js</li>
                    <li><DiMongodb />MongoDB</li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Home