import React, { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../App'

const Navbar = () => {

  const {state, dispatch} =useContext(UserContext);

  const RenderMenu = () =>{
    if(state){
      return(
        <>
          <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/logout">Logout</NavLink>
      </li>

      {/* <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li> */}
        </>
      )
    }else{
      return(
        <>
          <li className="nav-item active">
        <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to="/about">About</NavLink>
      </li>
      
      <li className="nav-item">
        <NavLink className="nav-link" to="/contact">Contact</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/login">Login</NavLink>
      </li>

      <li className="nav-item">
        <NavLink className="nav-link" to="/signup">Registration</NavLink>
      </li>

      {/* <li className="nav-item">
        <a className="nav-link" href="#">Link</a>
      </li> */}
        </>
      )
    }
  }

  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav ml-auto">
      <RenderMenu/>
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar