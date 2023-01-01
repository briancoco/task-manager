import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Register = ({setToken, navigate}) => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [validRegister, setValidRegister] = useState(true);
  const handleRegister = async (e) => {
    //need to call the register endpoint which is /api/auth/register using fetch api
    //need to pass in json obj containing email and password
    //if we get a 200 response, then we want to set the token in our state and we also want to add it to localStorage
    //we then want to naviagate the user to the feed
    e.preventDefault();
    let response = await fetch('http://localhost:3000/api/auth/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({email: registerEmail, password: registerPassword})
    })
    if(response.ok) {
      response = await response.json();
      localStorage.setItem('token', response.token);
      setToken(response.token);
      setValidRegister(true);
      navigate('/tasks');
    } else {
      setValidRegister(false);
    }

  }
  return (
    <>
    {!validRegister && <div className='login-invalid'>Invalid email/password. Try Again.</div>}
    <div className='register-wrapper'>
      <div className='register-border'>
        <h2>Register</h2>
        <form className='register' onSubmit={handleRegister}>
            <label htmlFor='email'>Email </label>
            <input 
                type='text'
                required
                placeholder='Enter email'
                id='email'
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
            />

            <label htmlFor='password'>Password </label>
            <input 
                type='password'
                required
                placeholder='Enter password'
                id='password'
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button className='register-btn button' type='submit'>Register</button>

        </form>
        </div>
        <Link to='/login' className='register-link'>Back</Link>
    </div>
    </>
  )
}

export default Register