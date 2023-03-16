import React from 'react'
import { Link } from 'react-router-dom';
import './css/sidebar.css';

function Sidebar() {
  return (
   
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
           
             <Link to="/">Home</Link>
             </div>
             <div className="sidebar-option">
             <Link to="/">Question</Link>
             </div>
             <div className="sidebar-option">
             <Link to="/">Tags</Link>
             </div>
             <div className="sidebar-option">
             <Link to="/">Users</Link>
              </div>
           
          
        </div>
      </div>
    </div>
  );
}

export default Sidebar