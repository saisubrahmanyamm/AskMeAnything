import React, { useEffect, useState } from "react";
import './css/allQuestions.css';
import { Avatar } from "@mui/material";
import { Link } from 'react-router-dom';
// import { stringAvatar } from "../../utils/Avatar";
import ReactHtmlParser from "react-html-parser";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function AllQuestions({data}) {
 
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  console.log(data);
  const user = useSelector(selectUser);
  const [link, setLink] = useState(`/question?q=${data?._id}`);
 var userData ;
 setTimeout(function() {
  myTest();

 }, 3000);
function myTest(){
 userData = user.email;
 setLink(`/question?q=${data?._id}&u=${userData}`);
}
  let tags = JSON.parse(data?.tags[0]);
  return (
    
    <div className="all-questions">
    <div className="all-questions-container">
    
      <div className="all-questions-left">
        <div className="all-options">
          <div className="all-option">
            <p>{data?.voteDetails[0]?.voteCount || 0} </p>
            <span>votes</span>
          </div>
          <div className="all-option">
          <p>{data?.answerDetails?.length}</p>
            <span>answers</span>
          </div>
          
        </div>
      </div>
      <div className="question-answer">
      <Link to={link}>{data.title}</Link>

        {/* <a href=>{data.title}</a> */}

        <div
          style={{
            maxWidth: "90%",
          }}
        >
        <div>{ReactHtmlParser(truncate(data.body, 200))}</div>
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
           {tags.map((_tag,i) => (
              <p className="question-tags" key = {i}> 
                {_tag}
              </p>
           ))}
         
        </div>
        <div className="author">
            <small>{new Date(data.created_at).toLocaleString()}</small>
            
            <div className="auth-details">
              <Avatar src={data?.user?.photo}  />
              <p>
                {data?.user?.displayName
                  ? data?.user?.displayName
                  : String (data?.user?.email).split('@')[0]} 
              </p>
            </div>
          </div>
      </div>
    </div>
  </div>
  );
}

export default AllQuestions