import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Login = () => {

  const {state, dispatch} = useContext(UserContext)

  const history = useNavigate();

  const [email,setEmail]= useState('');
  const [password, setPassword] = useState('');

  const loginUser= async (e) =>{
    e.preventDefault();

    const res = await fetch('/signin',{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password
      })
    });

    const data = res.json();

    if(res.status===400 || !data){
      window.alert("Invalid credentials");
    }else{
      dispatch({type:"USER", payload:true})
      window.alert("Login Successfully");
      history("/");
    }
  }

  return (
    <>
      <section className="login">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Login</h2>
              <form method='POST' className="register-form" id="register-form">

          

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" autoComplete="off" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  placeholder="Your Email"/>
                </div> 

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" autoComplete="off" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder="Your password"/>
                </div>


                <div className="form-group form-button">
                  <input type="submit" name="login" id="login" className="form-submit" value="Log In" onClick={loginUser} />
                </div>

                <NavLink to="/signup">Register Here</NavLink>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login