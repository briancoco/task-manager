import React from 'react'
import { Link } from 'react-router-dom';

const Login = ({handleLogin, email, setEmail, password, setPassword, validLogin}) => {
    //need an HTML form which will contain all the login details
    //after submitting the form, call will move to function which will
    //handle that login by calling our /api/auth/login endpoint using fetch api
    //and will pass in the user's email and passsword into our reqs body
    //we will then anylize the response, if it is a 200 response, then we want to save to token into our local storage
    //and redirect the user onto the tasks feed
    //if we get a bad response, then we want to display an error message and tell the user to try again
  return (
    <>
    {!validLogin && 
    <div className='login-invalid'>
        Invalid login! Try again.
    </div>}
    <div className='login-wrapper'>
        <form className='login' onSubmit={handleLogin}>
            <label htmlFor='email'>Email </label>
            <input 
                type='text'
                required
                placeholder='Enter email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor='password'>Password </label>
            <input 
                type='password'
                required
                placeholder='Enter password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className='login-btn' type='submit'>Login</button>

        </form>
        <Link to='/register' className='register-link'>New User? Register here</Link>
    </div>
    </>
  )
}

export default Login