import React, { useState } from "react";

import { Link } from 'react-router-dom';
import './css/sidebar.css';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { selectUser } from "../../features/userSlice";
function Sidebar() {
  const user = useSelector(selectUser);
  const [link, setLink] = useState(`/userquestions`);
 var userData ;
 
  setTimeout(function() {
   myTest();

  }, 3000);
function myTest(){
  userData = user.email;
  console.log("hi",userData);
  setLink(`/userquestions/?u=${userData}`);
}
  return (
   
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
           
             <Link to="/">Home</Link>
             </div>
             <div className="sidebar-option">
             <Link to={link}>My Questions</Link>
             {/* <Link to="/userquestions">hgjk</Link> */}
             </div>
             <div className="sidebar-option">
             <Link to="/">Tags</Link>
             </div>
             <div className="sidebar-option">
             <Link to="/users">Users</Link>
              </div>
           
          
        </div>
      </div>
    </div>
  );
}

export default Sidebar