import React from 'react'
import "./user.css";
import './css/main.css';
import userImage from './images/userImage.png';
import novice from './images/Novice.png';
import experienced from './images/Experienced.png';
import expert from './images/Expert.png';
import elite from './images/Elite.png';
import guru from './images/Guru.png';


  const UserCard = ({ displayName, email, photoURL, reputationPoints }) => {
    //const userImage = "./images/userImage.png";
    const images = [
      { points: 30, src: novice},
      { points: 60, src: experienced },
      { points: 100, src: expert },
      { points: 130, src: elite },
      { points: 150, src: guru }
    ];
    function ImageComponent({ points }) {
      const imageSrc = points >= 150
        ? images[4].src
        : points >= 130
          ? images[3].src
          : points >= 100
            ? images[2].src
            : points >= 60
              ? images[1].src
               : images[0].src;
      return (
        <div className="image">
          <img className="image img-src" src={imageSrc} alt={`Image for ${points} points`} />
        </div>
      );
    }
  return (
    <div className="card">
      <div className="image-container">
      <img src={photoURL == "No Photo"? userImage  :photoURL} alt={displayName} className="card-img-top" />
      </div>
      <div className="card-body">
        <h5 className="card-title">{displayName} </h5>
        <p className="card-text">{email}</p>
        <p className="card-text">Reputation Points: {reputationPoints}</p>
        <ImageComponent points={reputationPoints} />
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
        User details, Reputation and Badges
      </div>
      
          {users.map((user) => (
            <div key={user._id} className="col-md-4">
              <UserCard {...user} />
            </div>
          ))}
        
    
    </div>
</div>
      
    );
  };
  


export default Main