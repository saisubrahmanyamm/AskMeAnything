import React from 'react';
import AllQuestions from './AllQuestions';
import './css/main.css';
import FilterList from '@mui/icons-material/FilterList';
import {Link} from 'react-router-dom';


function Main() {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>

           {/* <a href="/add-question"> </a> */}

          
        </div>
        <div className="main-desc">
            <p>5 Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <a href="/">Newest</a>
                {/* <Link to="/">Newest</Link> */}
              </div>
              <div className="main-tab">

                {/* <Link to="/">Active</Link> */}

                <a href="/">Active</a>
              </div>
              <div className="main-tab">
                <a href="/">More</a>
                {/* <Link to="/">More</Link> */}
              </div>
            </div>
            <div className="main-filter-item">
                <FilterList />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
        </div>
      </div>
    </div>
  )
}

export default Main