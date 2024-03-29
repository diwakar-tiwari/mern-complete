import React, { createContext, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Logout from "./components/Logout";
import Error from "./components/Error";
import { initialState, reducer
 } from "./reducer/useReducer";

//1: Context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<Error />} />
    </Routes>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <>
      
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />

      </UserContext.Provider>
    </>
  );
};

export default App;
