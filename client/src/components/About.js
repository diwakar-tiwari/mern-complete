import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const About = () => {

   const history = useNavigate();
   const [userData, setUserData] = useState({});

  const callAboutPage = async()=>{
    try {
      const res = await fetch('/about',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "content-Type":"application/json"
        },
        credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      
      setUserData(data);

      if(!res.status === 200){
        const error = new Error(res.error);
        throw error;
      }

    } catch (error) {
      console.log(error);
      history('/login');
    }
  }

  useEffect(() => {
      callAboutPage();
  }, [])
  
  return (
    <>
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHeu1JU1avFzQtN-az4HZqEpR1VvEBN-SEXfEuOtt8Xg&s" />
            </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData.name}</h5> 
                {/* userData?.name? userData.name:"error" */}

                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">Rankings: <span>1/10</span></p>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-items">
                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab">About</a>
                  </li>

                  <li className="nav-items">
                    <a className="nav-link active" id="profile-tab" data-toggle="tab" href="#profile" role="tab">Timeline</a>
                  </li>
                </ul>
              </div>
            </div>  
          </div>

          <div className="row">
            {/* left side url */}
            <div className="col-md-4">
              <div className="profile-work">
                <p>Work Link</p>
                 <a href="#">Youtube</a><br/>
                 <a href="#">Youtube</a><br/>
                 <a href="#">Youtube</a><br/>
                 <a href="#">Youtube</a><br/>
                 <a href="#">Youtube</a><br/>
                 <a href="#">Youtube</a><br/>
              </div>
            </div>

            {/* right side data toggle */}
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                 <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                  <div className="row">

                    <div className="row">
                      
                      <div className="col-md-6">
                        <label>User ID</label>
                      </div>
                      <div className="col-md-6">
                        <p>789664779665</p>
                      </div>

                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.name}</p>
                      </div>

                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.email}</p>
                      </div>

                      <div className="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.phone}</p>
                      </div>

                      <div className="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.work} </p>
                      </div>
                    </div>
                  </div>
                 </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default About;
