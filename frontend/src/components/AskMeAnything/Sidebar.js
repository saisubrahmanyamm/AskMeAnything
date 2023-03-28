import React, { useState } from "react";

import { Link } from 'react-router-dom';
import './css/sidebar.css';
import { useSelector } from "react-redux";

import { selectUser } from "../../features/userSlice";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import QuizIcon from '@mui/icons-material/Quiz';
import CottageIcon from '@mui/icons-material/Cottage';

function Sidebar() {
  const user = useSelector(selectUser);
  const [link, setLink] = useState(`/userquestions`);
  const [bookmarkLink, setBookmarkLink] = useState(`/bookmarks`);

  var userData;

  setTimeout(function () {
    myTest();

  }, 3000);
  function myTest() {
    userData = user.email;
    console.log("hi", userData);
    setLink(`/userquestions/?u=${userData}`);
    setBookmarkLink(`/bookmarks/?u=${userData}`);

  }
  return (

    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-options">
          <div className="sidebar-option">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', fontSize:'15px' }}>
              <CottageIcon style={{ marginRight: '5px', fontSize: '25px' }} />
              Home
            </Link>
            {/* <Link to="/"><span><CottageIcon/></span><span>Home</span></Link> */}
          </div>
          <div className="sidebar-option">
            <Link to={link} style={{ display: 'flex', alignItems: 'center', fontSize:'15px' }}>
              <QuizIcon style={{ marginRight: '5px', fontSize: '25px' }}/>
              My Questions
              </Link>
            {/* <Link to="/userquestions">hgjk</Link> */}
          </div>
          <div className="sidebar-option">
            <Link to={bookmarkLink} style={{ display: 'flex', alignItems: 'center', fontSize:'15px' }}>
              <BookmarksIcon style={{ marginRight: '5px', fontSize: '25px' }}/>
              Bookmarks
              </Link>
          </div>
          <div className="sidebar-option">
            <Link to="/users" style={{ display: 'flex', alignItems: 'center', fontSize:'15px' }}>
              <SupervisedUserCircleIcon style={{ marginRight: '5px', fontSize: '25px' }}/>
              Users
              </Link>
          </div>


        </div>
      </div>
    </div>
  );
}

export default Sidebar