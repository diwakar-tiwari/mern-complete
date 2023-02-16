import React, { useState } from "react";
import { NavLink, useNavigate} from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const[user, setUser] = useState({
    name:"",email:"",phone:"",work:"",password:"",cpassword:""
  });

  let name, value;
  const handleInputs = (e) =>{
    // console.log(e);
    name = e.target.name;
    value=e.target.value;

    setUser({...user,[name]:value});
  }

  const PostData = async(e)=>{
    // alert("working")
        e.preventDefault(e);
        

        const{name, email, phone, work, password, cpassword}=user;

        const res = await fetch("/register",{
          method:"POST",
          headers:{
            "content-Type":"application/json"
          },
          body:JSON.stringify({
            name, email, phone, work, password, cpassword
          })
        });

        const data = await  res.json();

        console.log(data);

        if(data.status === 422 || !data){
          window.alert("Invalid Registration");
          console.log("Invalid Registration");
        }else{
          window.alert("Registration Successfull");
          console.log("Successfull Registration");

          history("/login");
        }
  }

  return (
    <>
      <section className="signup">
        <div className="container mt-5">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form method="POST" className="register-form" id="register-form">

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" autoComplete="off" 
                  value={user.name}
                  onChange={handleInputs}
                  placeholder="Your Name"/>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" name="email" id="email" autoComplete="off" 
                  value={user.email}
                  onChange={handleInputs}
                  placeholder="Your Email"/>
                </div> 

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="number" name="phone" id="phone" autoComplete="off" 
                  value={user.phone}
                  onChange={handleInputs}
                  placeholder="Contact"/>
                </div>  

                <div className="form-group">
                  <label htmlFor="work">Work</label>
                  <input type="text" name="work" id="work" autoComplete="off" 
                  value={user.work}
                  onChange={handleInputs}
                  placeholder="Your Profession"/>
                </div> 

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" autoComplete="off" 
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Your password"/>
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">Confirm Password</label>
                  <input type="cpassword" name="cpassword" id="cpassword" autoComplete="off" 
                  value={user.cpassword}
                  onChange={handleInputs}
                  placeholder="Confirm password"/>
                </div>

                <div className="form-group form-button">
                  <input type="button" name="signup" id="signup" className="form-submit" value="Register" onClick={PostData} />
                </div>

                <NavLink to="/login">Already Registered</NavLink>
                
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
