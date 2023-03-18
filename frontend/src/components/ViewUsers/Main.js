import React from 'react'
import "./user.css";
import './css/main.css';


  const UserCard = ({ displayName, email, photoURL, reputationPoints }) => {
  return (
   
    <div className="card">
      <img src={photoURL} alt={displayName} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{displayName}</h5>
        <p className="card-text">{email}</p>
        <p className="card-text">Reputation Points: {reputationPoints}</p>
      </div>
    </div>

      );
};
  const Main = ({ users }) => {
    return (
      <div className="main">
    <div className="main-container">
      <div className="main-top">
        <h2>All Users</h2>
      </div>
      <div className="main-desc">
      <div className="questions">
        <div className='row'>
        <div className="col-md-12">
          {users.map((user) => (
            <div key={user._id} className="col-md-4">
              <UserCard {...user} />
            </div>
          ))}
          </div>
        </div>
        </div>
    </div>
    </div>
</div>
      
    );
  };
  


export default Main