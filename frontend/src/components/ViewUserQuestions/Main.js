import React, { useEffect, useState } from "react";
import './css/main.css';
import FilterList from '@mui/icons-material/FilterList';
import {Link} from 'react-router-dom';
import UserQuestions from "./UserQuestions";


function Main({questions }) {
 // const [dataList, setDataList] = useState({});
  const [sortNewest, setSortNewest] = useState(true);
console.log("edi main",questions)
  const sortedData = questions ?[...questions].sort((a, b) => {
    if (sortNewest) {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  }):[];
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>Your Posted Questions</h2>
          <Link to="/addQuestion">
            <button>Ask Question</button>
          </Link>

           {/* <a href="/add-question"> </a> */}

          
        </div>
        <div className="main-desc">
            <p>{questions && questions.length} Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
            <div className="main-filter-item">
                <FilterList /> 
            </div>
              <div className="main-tab">
                <a onClick={() => setSortNewest(true)} style={{ cursor: 'pointer' }}>Newest</a>
              </div>
              <div className="main-tab">
                <a onClick={() => setSortNewest(false)}style={{ cursor: 'pointer' }}>Oldest</a>
              </div>
             
            </div>
            
          </div>
        </div>
        <div className="questions">
          {sortedData?.map((_q,i) => (
            <div className="question" key={i}>
              <UserQuestions data={_q} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Main