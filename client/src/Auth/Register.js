import { useState } from 'react';
import Image from '../images/undraw_secure_login_pdn4.png'; // Import the image file
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import { Axios } from '../Axios/Axios';
import { Link, useNavigate } from 'react-router-dom';
export default function Register() {

const nav= useNavigate()
const [form,setForm]=useState({
  name:"",
  email:"",
  password:""
})
  async function handelsubmit(e){
e.preventDefault()
try{
 const res = await Axios.post('/register',form);
console.log(res);
nav("/login");
}catch(error){
  console.log(error);
  
}
  }
  function handleChange(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
  
  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="text-center mb-4">Register</h1>
        <div className='Img'> <img src={Image} alt="Login" style={{cursor:'pointer'}} className="login-image mb-4" /> 
        <h4 style={{paddingBottom:"45px",fontSize:"35px"}}>Welcom in Our WebSite Please Register</h4>
        </div>
        <div className="h5-container">
      <h5 className="h5-text">
       I have Account I Want to  <Link to="/login">Log IN</Link>
      </h5>
    </div>
        <form onSubmit={handelsubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              placeholder="Enter your Email"
              name='email'
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">User Name </label>
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={handleChange}
              placeholder="Enter your Name"
              name='name'
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name='password'
              onChange={handleChange}
              placeholder="Enter your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  );
}

