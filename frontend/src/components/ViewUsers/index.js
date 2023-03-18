import React, { useEffect, useState } from "react";
import Sidebar from "../AskMeAnything/Sidebar";
import "./css/index.css";
import axios from "axios";
import Main from "./Main";

function Index(){
  let search = window.location.search;
  const params = new URLSearchParams(search);

  const email = params.get("u");

  //let tags = JSON.parse(data?.tags[0]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getQuestion() {
      console.log("ravatledu");
      await axios.get(`/api/user`).then((res) => {
        setUsers(res.data);
        
         console.log("Edi use matter",res.data)
        
      });
    }
    getQuestion();
  }, []);
  

    return(
        <div className="stack-index">
        <div className="stack-index-content">
          <Sidebar />
          <Main users = {users} />
        </div>
      </div>
    );
}
export default Index