import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from "@mui/icons-material/History";
import ReactQuill from "react-quill";
// import Editor from "react-quill/lib/toolbar";
// import axios from "axios";
// import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { selectUser } from "../../feature/userSlice";
// import { stringAvatar } from "../../utils/Avatar";
import './css/index.css';

function MainQuestion() {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question"></h2>
          <Link to="/addQuestion">
            <button>Ask Question</button>
          </Link>
          {/* <a href="/add-question">
            <button>Ask Question</button>
          </a> */}
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              <span></span>
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed<span>43times</span>
            </p>
          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">
                <p className="arrow">▲</p>

                <p className="arrow">0</p>

                <p className="arrow">▼</p>

                <BookmarkIcon />

                <HistoryIcon />
              </div>
            </div>
            <div className="question-answer">
              <p></p>

              <div className="author">
                <small>
                  asked 
                </small>
                <div className="auth-details">
                  <Avatar  />
                  <p>
                   
                  </p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  
                </div>
                <p >Add a comment</p>
                
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value= ""
                      
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            flexDirection: "column",
          }}
          className="all-questions"
        >
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
             Answers
          </p>
         
            <>
              <div
                style={{
                  borderBottom: "1px solid #eee",
                }}
                key= ""
                className="all-questions-container"
              >
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">▲</p>

                    <p className="arrow">0</p>

                    <p className="arrow">▼</p>

                    <BookmarkIcon />

                    <HistoryIcon />
                  </div>
                </div>
                <div className="question-answer">
                  {/* {ReactHtmlParser(_q.answer)} */}
                  <div className="author">
                    <small>
                      {/* asked {new Date(_q.created_at).toLocaleString()} */}
                    </small>
                    <div className="auth-details">
                      <Avatar />
                      <p>
                       
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
         
        </div>
        {/* <div className="questions">
          <div className="question">
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
            <AllQuestions />
          </div>
        </div> */}
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <ReactQuill
          value=""
         
          
          className="react-quill"
          theme="snow"
          style={{
            height: "200px",
          }}
        />
      </div>
      <button
        
        style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}
      >
        Post your answer
      </button>
    </div>
  )
}

export default MainQuestion