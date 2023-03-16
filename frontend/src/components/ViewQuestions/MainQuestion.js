import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from "@mui/icons-material/History";
import ReactQuill from "react-quill";
//import Editor from "react-quill/lib/toolbar";
import Editor from "react-quill/lib/index";

import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

// import { stringAvatar } from "../../utils/Avatar";
import './css/index.css';

function MainQuestion() {

  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const [voteCount, setVoteCount] = useState([]);
  
  const [answerVoteCount, setAnswerVoteCount] = useState([]); 
  const [ansVoteCounts, setAnsVoteCounts] = useState({});
  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  // const [comments, setComments] = useState([]);
  const user = useSelector(selectUser);
  var temp = {};
  const handleQuill = (value) => {
    setAnswer(value);
  };

  useEffect(() => {
    async function getFunctionDetails() {
      
      await axios
        .get(`/api/question/${id}`)
        .then(res => {
          setQuestionData(res.data[0]);
          setVoteCount( res.data[0].voteDetails[0] ? res.data[0].voteDetails[0].voteCount : 0);
          temp = {...ansVoteCounts};
          for (let i = 0; i < res.data[0].answerDetails.length; i++) {
            temp[res.data[0].answerDetails[i]._id] = res.data[0].answerDetails[i].votesCount ;
          }
          setAnsVoteCounts(temp);
         
        })
        .catch((err) => console.log(err));
    }
    
     
      
     getFunctionDetails();
    
  }, [id]);

  async function getUpdatedAnswer() {
    await axios
      .get(`/api/question/${id}`)
      .then((res) => setQuestionData(res.data[0]))
      .catch((err) => console.log(err));
  }


  // console.log(questionData);
  const handleSubmit = async () => {
    const body = {
      question_id: id,
      answer: answer,
      user: user,
    };
    console.log(user);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post("/api/answer", body, config)
      .then(() => {
        alert("Answer added successfully");
        setAnswer("");
        getUpdatedAnswer();
      })
      .catch((err) => console.log(err));
  };

  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isDownvoted, setIsDownvoted] = useState(false);
  const handleVote = async (isUpvote) => {
    const body = {
      user: user,
    };
    let url = `/api/votes/${id}/upvote`;
    if (!isUpvote) {
      url = `/api/votes/${id}/downvote`;
    }
    // console.log(user);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(url, body, config)
      .then(response => {
        // alert("Answer added successfully");
        // console.log("nenu",response);
        setVoteCount(response.data.votes);
        setIsUpvoted(response.data.isUpvoted);
        setIsDownvoted(response.data.isDownvoted);

      })
      .catch((err) => console.log(err));
  };
  

  //const [isAnsUpvoted, setAnsIsUpvoted] = useState(false);
  //const [isAnsDownvoted, setAnsIsDownvoted] = useState(false);
  
  const [ansVoteStatuses, setAnsVoteStatuses] = useState({});
  const handleAnsVote = async (isUpvote,ansId) => {
    const body = {
      user: user,
    };
    let url = `/api/ansvotes/${id}/${ansId}/upvote`;
    if (!isUpvote) {
      url = `/api/ansvotes/${id}/${ansId}/downvote`;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    await axios
      .post(url, body, config)
      .then(response => {
        // alert("Answer added successfully");
        const newVoteCounts = { ...ansVoteCounts };
        const newVoteStatuses = { ...ansVoteStatuses };
        newVoteCounts[ansId] = response.data.votes;
         setAnsVoteCounts(newVoteCounts);
      newVoteStatuses[ansId] = {
        isUpvoted: response.data.isUpvoted,
        isDownvoted: response.data.isDownvoted,
      };
      setAnsVoteStatuses(newVoteStatuses);
     
        // setAnswerVoteCount(response.data.votes);
        // setAnsIsUpvoted(response.data.isUpvoted);
        // setAnsIsDownvoted(response.data.isDownvoted);

      })
      .catch((err) => console.log(err));
  };

  const handleComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: user,
      };
      await axios.post(`/api/comment/${id}`, body).then((res) => {
        setComment("");
        setShow(false);
        getUpdatedAnswer();
        // console.log(res.data);
      });
    }
  }

  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title}</h2>
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
              <span>{new Date(questionData?.created_at).toLocaleString()}</span>
            </p>
            <p>
              Active<span>today</span>
            </p>

          </div>
        </div>
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="all-questions-left">
              <div className="all-options">

             
                <div>
                  <button onClick={() => handleVote(true)} disabled={isUpvoted}>
                    {isUpvoted ? 'Upvoted' : 'Upvote'}
                  </button>
                  <p className="arrow">{voteCount}</p>
                  <button onClick={() => handleVote(false)} disabled={isDownvoted}>
                    {isDownvoted ? 'Downvoted' : 'Downvote'}
                  </button>
                </div>
                <BookmarkIcon />


              </div>
            </div>
            <div className="question-answer">
              <p>{ReactHtmlParser(questionData?.body)}</p>

              <div className="author">
                <small>
                  asked - {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="auth-details">
                  <Avatar src={questionData?.user?.photo} />
                  <p>
                    {questionData?.user?.displayName
                      ? questionData?.user?.displayName
                      : String(questionData?.user?.email).split('@')[0]}
                  </p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                  {questionData?.comments &&
                    questionData?.comments.map((_qd) => (
                      <p key={_qd?._id}>
                        {_qd.comment}{" "}
                        <span>
                          - {_qd.user?.displayName || _qd.user?.email.split('@')[0]}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date(_qd.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <textarea
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
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
            {questionData && questionData?.answerDetails.length} Answers
          </p>
          {questionData?.answerDetails.map((_q, i) => (
            <>
              <div
                style={{
                  borderBottom: "1px solid #eee",
                }}
                key={i}
                className="all-questions-container"
              >
                <div className="all-questions-left">
                  <div className="all-options">
                  <div>
                  <button onClick={() => handleAnsVote(true,_q._id)} disabled={ansVoteStatuses[_q._id]?.isUpvoted}>
                  {ansVoteStatuses[_q._id]?.isUpvoted ? "Upvoted" : "Upvote"}
                  </button>
                  <p className="arrow">{ansVoteCounts[_q._id] ? ansVoteCounts[_q._id] : 0}</p>

                  <button onClick={() => handleAnsVote(false,_q._id)} disabled={ansVoteStatuses[_q._id]?.isDownvoted}>
                  {ansVoteStatuses[_q._id]?.isDownvoted ? "Downvoted" : "Downvote"}
                  </button>
                </div>


                  </div>
                </div>
                <div className="question-answer">
                  {ReactHtmlParser(_q.answer)}
                  <div className="author">
                    <small>
                      asked {new Date(_q.created_at).toLocaleString()}
                    </small>
                    <div className="auth-details">
                      <Avatar src={_q?.user?.photo} />
                      <p>
                        {_q?.user?.displayName
                          ? _q?.user?.displayName
                          : String(_q?.user?.email).split('@')[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
        
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
          value={answer}
          onChange={handleQuill}
          modules={Editor.modules}
          className="react-quill"
          theme="snow"
          style={{
            height: "200px",
          }}
        />
      </div>
      <button
        onClick={handleSubmit}
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





export default MainQuestion;