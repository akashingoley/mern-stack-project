import React, { useState } from 'react'
import './CSS/LoginSignUp.css'

const LoginSignUp = () => {
  const [state, setState] = useState("Login");

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: ""
  });

  const changeHandler = (e) => {
    setFormData({...formData,[e.target.name] : e.target.value})
  }

  const login = async() => {
    console.log("Login function executed", formData);

    let responseData;
    await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((resp) => resp.json())
    .then((data) => {responseData = data})

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors)
    }
  }

  const signup = async() => {
    console.log("Signup function executed", formData);

    let responseData;
    await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(formData),
    }).then((resp) => resp.json())
    .then((data) => {responseData = data})

    if(responseData.success){
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    }else{
      alert(responseData.errors)
    }
  }

  return (
    <div className='loginSignUp'>
      <div className="loginSignUp-container">
        <h1>{ state }</h1>
        <div className="loginSignUp-fields">
          {state === "Sign up" ?<input type="text" onChange={changeHandler} name='name' value={formData.name} placeholder='Your Name' /> : <></>}
          <input type="email" onChange={changeHandler} name='email' value={formData.email} placeholder='Your Email Address' />
          <input type="password" onChange={changeHandler} name='password' value={formData.password} placeholder='Password' />
        </div>
        <button onClick={() => {state==="Login" ? login() : signup()}}>Continue</button>
        {state === "Sign up" ? <p className='loginSignUp-login'>Already have an account? <span onClick={() => setState("Login")}>Login here</span></p> :
        <p className='loginSignUp-login'>Create an Account <span onClick={() => setState("Sign up")}>Click here</span></p> }
        <div className="loginSignUp-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms and policy.</p>
        </div>
      </div>
    </div>
  )
}

export default LoginSignUp