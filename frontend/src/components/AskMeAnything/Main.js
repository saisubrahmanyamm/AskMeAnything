import React, { useEffect, useState } from "react";
import AllQuestions from './AllQuestions';
import './css/main.css';
import FilterList from '@mui/icons-material/FilterList';
import {Link} from 'react-router-dom';
import SearchIcon from "@mui/icons-material/Search";


function Main({questions}) {
 // const [dataList, setDataList] = useState({});
  const [sortNewest, setSortNewest] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");


  const sortedData = questions ?[...questions].sort((a, b) => {
    if (sortNewest) {
      return new Date(b.created_at) - new Date(a.created_at);
    } else {
      return new Date(a.created_at) - new Date(b.created_at);
    }
  }):[];
  const filteredData = sortedData.filter((q) =>
  q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
  q.user.displayName.toLowerCase().includes(searchQuery.toLowerCase()) || 
  q.body.toLowerCase().includes(searchQuery.toLowerCase()) || 
  JSON.stringify(q.tags).toLowerCase().includes(searchQuery.toLowerCase())

  );

  return (
    <div className="main">
      <div className="main-container">
      <div className = "header-search-container">
                <SearchIcon></SearchIcon>
                <input type = "text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
             </div>
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/addQuestion">
            <button>Ask Question</button>
          </Link>

           {/* <a href="/add-question"> </a> */}

          
        </div>
        <div className="main-desc">
        <p>{filteredData.length} Questions</p>
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
        {filteredData.length === 0 ? (
            <p>No results found</p>
          ) : ( filteredData?.map((_q,i) => (
            <div className="question" key={i}>
              <AllQuestions data={_q} />
            </div>
          )))}
        </div>
      </div>
    </div>
  )
}

export default Main