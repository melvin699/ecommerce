import React, { useState } from 'react';
import './Css/LoginSignup.css'
const LoginSignup = () => {

  const [state,setState] = useState("Login");
  const [formData,setFormData] = useState({
    name:"",
    password:"",
    email:""

  })

  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }

const login = async () =>{
console.log("Login was succesful",formData);
let responseData;
  await fetch ('http://localhost:5000/login',{
    method:'POST',
    headers:{
       Accept: 'application/json',
       'Content-Type':'application/json'
    },
    body: JSON.stringify(formData),
    
  }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }

else{
  alert(responseData.errors)
}
}
const signup = async () =>{
  console.log("Signup was succesful",formData);
  let responseData;
  await fetch ('http://localhost:5000/signup',{
    method:'POST',
    headers:{
       Accept: 'application/json',
       'Content-Type':'application/json'
    },
    body: JSON.stringify(formData),
    
  }).then((response)=>response.json()).then((data)=>responseData=data)
  if(responseData.success){
    localStorage.setItem('auth-token',responseData.token);
    window.location.replace("/");
  }

else{
  alert(responseData.errors)
}
}

  return (
    <div className='loginsignup'>
      <div className="signuplogin-container">
        <h1>{state}</h1>
        <div className="signuplogin-fields">
          {state=== "Sign Up"?<input name='name' value={formData.name} onChange={changeHandler} type="text" placeholder="Your Name"  />:<></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name='password' value={formData.passwordl} onChange={changeHandler} type="password" placeholder="Password" />
          {state === "Sign Up"?<input name='password' value={formData.passwordl} onChange={changeHandler} type="password" placeholder="Confirm Password" />:<></>}
        </div>
        <button onClick={()=>{state==="Login"?login():signup()}}>SUBMIT</button>
        {state==="Sign Up"?<p className="signuplogin-login">Already have an account? <span onClick={()=>{setState("Log in")}}>LogIn</span></p>
        : <p className="signuplogin-login">Create account <span onClick={()=>{setState("Sign Up")}}>Sign up</span></p>

}

        <div className="signuplogin-terms">
          <input type="checkbox" name='' id='' />
          <p>By continuing you agree to follow the terms and conditions</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
