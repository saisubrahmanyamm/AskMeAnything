import React from 'react';
import './css/allQuestions.css';
import { Avatar } from "@mui/material";
import { Link } from 'react-router-dom';

function AllQuestions() {
  return (
    <div className="all-questions">
    <div className="all-questions-container">
      <div className="all-questions-left">
        <div className="all-options">
          <div className="all-option">
            <p>0</p>
            <span>votes</span>
          </div>
          <div className="all-option">
            <p>0</p>
            <span>answers</span>
          </div>
          <div className="all-option">
            <small>2 views</small>
          </div>
        </div>
      </div>
      <div className="question-answer">
        <Link>This is Question title</Link>

        {/* <a href=>{data.title}</a> */}

        <div
          style={{
            maxWidth: "90%",
          }}
        >
          <div>This is answer </div>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
         <span className="question-tags">react</span>
         <span className="question-tags">react-dom</span>
         <span className="question-tags">Frontend</span>
         
        </div>
        <div className="author">
          <small>Time</small>
          <div className="auth-details">
            <Avatar />
            <p>Username </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default AllQuestions