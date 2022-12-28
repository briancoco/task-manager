import React from 'react'
import { Link } from 'react-router-dom';
const Register = ({handleRegister, registerEmail, setRegisterEmail, registerPassword, setRegisterPassword, validRegister}) => {
  return (
    <>
    {!validRegister && <div className='login-invalid'>Invalid email/password. Try Again.</div>}
    <div className='register-wrapper'>
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
            <button className='register-btn' type='submit'>Register</button>

        </form>
        <Link to='/' className='register-link'>Back</Link>
    </div>
    </>
  )
}

export default Register