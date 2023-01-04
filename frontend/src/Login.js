import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Login = ({navigate, setToken}) => {
    //need an HTML form which will contain all the login details
    //after submitting the form, call will move to function which will
    //handle that login by calling our /api/auth/login endpoint using fetch api
    //and will pass in the user's email and passsword into our reqs body
    //we will then anylize the response, if it is a 200 response, then we want to save to token into our local storage
    //and redirect the user onto the tasks feed
    //if we get a bad response, then we want to display an error message and tell the user to try again
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const handleLogin = async (e) => {
        //calls our backend api using fetch with the user's inputted email/password
        //if there is an error, we want to keep the user on the login screen
        //and display the error, otherwise save the token in localStorage and navigate the user
        //to the tasks feed
        e.preventDefault();
        try {
          let response = await fetch('http://localhost:3000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email, password})
          });
          if(response.ok){
            response = await response.json();
            localStorage.setItem('token', response.token);
            setToken(response.token);
            setError(null);
            navigate('/tasks');
          } else if(response.status === 401) {
            throw Error('Invalid Credentials. Try Again')
          } else {
            throw Error('Error. Try Again');
          }
        } catch (error) {
          setError(error.message);
        }
    
    }
  return (
    <>
    {error &&
    <div className='login-invalid'>
        {error}
    </div>}
    <div className='login-wrapper'>
        <div className='login-border'>
            <h2>Login</h2>
        <form className='login' onSubmit={handleLogin}>
            <div className='login-input'>
            <label htmlFor='email'>Email </label>
            <input 
                type='text'
                required
                placeholder='Enter email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>

            <div className='login-input'>
            <label htmlFor='password'>Password </label>
            <input 
                type='password'
                required
                placeholder='Enter password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button className='login-btn button' type='submit'>Submit</button>

        </form>
        </div>
        <Link to='/register' className='register-link'>New User? Register here</Link>
    </div>
    </>
  )
}

export default Login