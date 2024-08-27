import {  useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import Image from '../images/undraw_secure_login_pdn4.png';  // Correct path if necessary
import Cookie from 'cookie-universal';
import { Axios } from '../Axios/Axios';

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
const [error,setError]=useState(false)
  const cookie = Cookie();
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await Axios.post('/login', form);
      console.log(res.data.userToken);
      cookie.set("Iot_Project",res.data.userToken)
      window.location.pathname='/'
    } catch (error) {
      if(error){
        setError(true)
      }
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
        <h1 className='text-center'>Login</h1>
        <div className='Img'>
          <img src={Image} style={{ cursor: 'pointer',width:"200px" }} alt="Login" className="login-image mb-4" />
          <h4 style={{ paddingBottom: "45px", fontSize: "35px" }}>Welcome to Our Website. Please Log In</h4>
         
        </div>
        <div className="h5-container">
      <h5 className="h5-text">
        Don't have an account? Please <Link to="/register">Register</Link>
      </h5>
    </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              onChange={handleChange}
              placeholder="Enter your email"
              name="email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              required
            />
           {error ? <p style={{color:"red"}}>Wrong Email Or Password</p> : ''}
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
}
