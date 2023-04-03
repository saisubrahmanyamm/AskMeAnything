import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import HistoryIcon from "@mui/icons-material/History";
import ReactQuill from "react-quill";
//import Editor from "react-quill/lib/toolbar";
import Editor from "react-quill/lib/index";

import axios from "axios";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import CheckIcon from '@mui/icons-material/Check';
import badWords from 'bad-words';
// import { stringAvatar } from "../../utils/Avatar";
import './css/index.css';
import { Cursor } from "mongoose";

function MainQuestion() {
  const [loading, setLoading] = useState(true);
  const filter = new badWords();

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  Editor.modules = {
    syntax: false,
    toolbar: toolbarOptions,
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  Editor.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  Editor.container= 'div';
  let search = window.location.search;
  const params = new URLSearchParams(search);
  const id = params.get("q");
  const [currentUser, setCurrentUser] = useState(params.get("u"));
  const [voteCount, setVoteCount] = useState([]);
  const [questionUser, setQuestionUser] = useState();
  const [answerVoteCount, setAnswerVoteCount] = useState([]);
  const [ansVoteCounts, setAnsVoteCounts] = useState({});
  const [correctAnsCount, setCorrectAnsCount] = useState({});
  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const user = useSelector(selectUser);

  // var sameUser = false;
  const [showButton, setShowButton] = useState(false);
  var temp = {};
  var tempCorrectAns = {};
  const handleQuill = (value) => {
    setAnswer(value);
  };
  useEffect(() => {
    async function getFunctionDetails() {

      await axios
        .get(`/api/question/${id}`)
        .then(res => {
          setQuestionData(res.data[0]);
          console.log(res.data[0]);
          setVoteCount(res.data[0].voteDetails[0] ? res.data[0].voteDetails[0].voteCount : 0);
          setQuestionUser(res.data[0]?.user?.email);

          temp = { ...ansVoteCounts };
          for (let i = 0; i < res.data[0].answerDetails.length; i++) {
            temp[res.data[0].answerDetails[i]._id] = res.data[0].answerDetails[i].votesCount;
          }
          setAnsVoteCounts(temp);
          tempCorrectAns = { ...correctAnsCount };
          for (let i = 0; i < res.data[0].answerDetails.length; i++) {
            tempCorrectAns[res.data[0].answerDetails[i]._id] = res.data[0].answerDetails[i].correctAnswer;
          }
          console.log("adey", tempCorrectAns);
          setCorrectAnsCount(tempCorrectAns);

        })
      await axios
        .get(`/api/bookmark/${id}/${currentUser}`)
        .then(res => {
          setIsBookmarked(res.data.exists);
          console.log("book", res);
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
    if (filter.isProfane(answer)) {
      alert('Please do not use bad language');
    } else {
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
    }
  };


  const [isBookmarked, setIsBookmarked] = useState(false);
  const handleBookmark = async (isBookmarked) => {
    console.log("aghd", isBookmarked);
    if (!isBookmarked) {
      const body = {
        question_id: id,
        user: user,
      };
      let url = `/api/bookmark`;

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
          console.log("nenu", response);
          setIsBookmarked(response);

        })
        .catch((err) => console.log(err));
    } else {
      alert("Already Bookmarked");
    }
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

  const [isCorrect, setIsCorrect] = useState(false);
  const [ansCorrectStatus, setAnsCorrectStatus] = useState({});
  const handleMarkCorrect = async (ansId, email) => {
    axios
      .put(`/api/answer/${ansId}`, { correctAnswer: true })
      .then((response) => {

        const newCorrectAns = { ...correctAnsCount };
        const newCorrectAnsStatus = { ...ansCorrectStatus };
        newCorrectAns[ansId] = response.data.correctAnswer;
        setCorrectAnsCount(newCorrectAns);
        newCorrectAnsStatus[ansId] = {
          isCorrected: response.data.isCorrected,
        };
        setAnsCorrectStatus(newCorrectAnsStatus);

        // console.log(response.data);
      })
    axios
      .put(`/api/user/${email}`, { points: 10 })
      .then((response) => {

        console.log("userdata resp", response.data);

        // console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const [ansVoteStatuses, setAnsVoteStatuses] = useState({});
  const handleAnsVote = async (isUpvote, ansId) => {
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
      if (filter.isProfane(comment)) {
        alert('Please do not use bad language');
      } else {
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
                  <span
                    style={{
                      fontSize: "35px",
                      cursor: "pointer",
                      color: isUpvoted ? "rgb(84 83 83)" : "rgba(0, 0, 0, 0.25)",
                      pointerEvents: isUpvoted ? "none" : "auto"
                    }}
                    onClick={() => handleVote(true)}
                  >
                    ▲
                  </span>

                  <p className="arrow">{voteCount}</p>
                  <span style={{
                    fontSize: "35px",
                    cursor: "pointer",
                    color: isDownvoted ? "rgb(84 83 83)" : "rgba(0, 0, 0, 0.25)",
                    pointerEvents: isDownvoted ? "none" : "auto"
                  }} onClick={() => handleVote(false)} disabled={isDownvoted}>
                    {/* {isDownvoted ? 'Downvoted' : 'Downvote'} */}
                    ▼
                  </span>
                </div>
                {/* <button onClick={() => handleBookmark()}><BookmarkIcon /></button> */}
                {isBookmarked ? (<BookmarkIcon onClick={() => handleBookmark(isBookmarked)} style={{ cursor: 'pointer', fontSize: '30px',  }} />) : (<BookmarkBorderIcon style={{ cursor: 'pointer', fontSize: '30px', }} onClick={() => handleBookmark(isBookmarked)} />)}

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
                      {/* <p style={{
                        fontSize: "30px",
                        cursor: "pointer"
                      }} onClick={() => handleAnsVote(true, _q._id)} disabled={ansVoteStatuses[_q._id]?.isUpvoted}>
                        {ansVoteStatuses[_q._id]?.isUpvoted ? '▲' : '△'}
                      </p> */}

                      <span
                        style={{
                          fontSize: "30px",
                          cursor: "pointer",
                          color: ansVoteStatuses[_q._id]?.isUpvoted ? "rgb(84 83 83)" : "rgba(0, 0, 0, 0.25)",
                          pointerEvents: ansVoteStatuses[_q._id]?.isUpvoted ? "none" : "auto"
                        }}
                        onClick={() => handleAnsVote(true, _q._id)}
                      >
                        ▲
                      </span>

                      <p className="arrow">{ansVoteCounts[_q._id] ? ansVoteCounts[_q._id] : 0}</p>

                      {/* <button style={{
                        fontSize: "30px",
                        cursor: "pointer"}} onClick={() => handleAnsVote(false, _q._id)} disabled={ansVoteStatuses[_q._id]?.isDownvoted}>
                        {ansVoteStatuses[_q._id]?.isDownvoted ? '▼': '▽'}
                      </button> */}
                      <span
                        style={{
                          fontSize: "35px",
                          cursor: "pointer",
                          color: ansVoteStatuses[_q._id]?.isDownvoted ? "rgb(84 83 83)" : "rgba(0, 0, 0, 0.25)",
                          pointerEvents: ansVoteStatuses[_q._id]?.isDownvoted ? "none" : "auto"
                        }}
                        onClick={() => handleAnsVote(false, _q._id)}
                      >
                        ▼
                      </span>
                      {correctAnsCount[_q._id] ? (<CheckIcon style={{ fontSize: "50px",paddingBottom: "12px",paddingTop:'7px', color: "green" }} />) : (<p> </p>)}
                    </div>


                  </div>
                </div>
                <div className="question-answer">
                  {ReactHtmlParser(_q.answer)}
                  
                  <div className="author">
                    {/* {correctAnsCount[_q._id] || currentUser === questionUser?(<button onClick={() =>handleMarkCorrect(_q._id)}>Mark It Correct</button>):(<p></p>)} */}
                    {correctAnsCount[_q._id] ? <p></p> :
                      currentUser === questionUser ?
                        <button onClick={() => handleMarkCorrect(_q._id, _q.user.email)}>Mark It Correct</button> :
                        <p></p>
                    }
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