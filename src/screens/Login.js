import React, { useState } from 'react'
import Navbar from '../components/Navbar';
import { Link,useNavigate } from 'react-router-dom';
export default function Login() {
  const [credentials,setcredentials]=useState({email:"",password:""});
  let navigate = useNavigate();

  const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
      const response =await fetch("http://localhost:8000/api/login",{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify({email:credentials.email,password:credentials.password})
  });
  const json = await response.json();
  console.log(json);
  if(json.success){
    localStorage.setItem('userEmail', credentials.email)
    localStorage.setItem('token', json.authToken)
    navigate("/");
     
  }else{
    alert("Enter Valid Credentials")
  }

  }catch(error){
      console.log(error);
  }
};
  const onChange=(e)=>{
      const{name,value}=e.target;
      setcredentials({...credentials,[name]:value});
  }
  return (
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', height: '100vh', backgroundSize: 'cover' }}>
    <div>
      <Navbar/>
    </div>
    <div className='container'>
    <form className='w-50 m-auto mt-5 border bg-light  rounded' onSubmit={handleSubmit}>
 <div className="mb-3">
   <label htmlFor="exampleInputEmail1" className="form-label">Email </label>
   <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
   <div id="emailHelp" className="Form-text">We'll never share your email with anyone else.</div>
 </div>
 <div className="mb-3">
   <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
   <input type="password" className="form-control"name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
 </div>
 <button type="submit" className="btn btn-primary">Submit</button>
 <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user!  </Link>
</form>
</div>
   </div>
  )
}
