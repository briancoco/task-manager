import React from 'react'
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {BsFillPersonFill, BsFillInboxFill, BsFillPlusCircleFill} from 'react-icons/bs';
import {FaKeybase} from 'react-icons/fa';

const Header = () => {
  return (
    <IconContext.Provider value={{color:"#0f172a", size: '2em'}}>
    <div className='header'>
      <Link to='/'><FaKeybase /></Link>
      <nav className='navbar'>
        <Link to='/tasks/create'><BsFillPlusCircleFill /></Link>
        <Link to='/tasks'><BsFillInboxFill /></Link>
        <Link to='/login'><BsFillPersonFill /></Link>
      </nav>
    </div>

    </IconContext.Provider>
  )
}

export default Header