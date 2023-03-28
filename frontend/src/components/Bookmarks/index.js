import React, { useEffect, useState } from "react";
import Sidebar from "../AskMeAnything/Sidebar";
import "./css/index.css";
import BookmarkQuestions from "./BookmarkQuestions";
import axios from "axios";
import Main from "./Main";

function Index(){
  let search = window.location.search;
  const params = new URLSearchParams(search);

  const email = params.get("u");

  //let tags = JSON.parse(data?.tags[0]);
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    async function getQuestion() {
      console.log("ravatledu");
      await axios.get(`/api/question/bookmark/${email}`).then((res) => {
       setQuestions(res.data.reverse());
        
         console.log("Edi booksmarsk",res.data)
        
      });
    }
    getQuestion();
  }, []);
  

    return(
        <div className="stack-index">
        <div className="stack-index-content">
          <Sidebar />
          <Main questions = {questions} />
        </div>
      </div>
    );
}
export default Index