import React, { useState } from 'react';
import './index.css';
import GoogleIcon from '@mui/icons-material/Google';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { fontSize } from '@mui/system';
import { useHistory } from "react-router-dom";
import { displayName } from 'react-quill';
import axios from "axios";




function Index() {
  const history = useHistory();
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dateofbirth, setDateofBirth] = useState("");
  const [error, setError] = useState("");
  var user = {};

  function validateEmail(email) {
    const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(email) === false) {
      return false;
    } else return true;
  }

  const handleSignInGoogle = () => {
    signInWithPopup(auth, provider).then((res) => {
      console.log(res);
      history.push("/");
      setLoading(false);
      user = {
        displayName  :res.user.displayName ? res.user.displayName : String(res.user.email).split('@')[0],
        email : res.user.email,
        uid: res.user.uid,
        photoURL : res.user.photoURL ? res.user.photoURL : "No Photo"
      };
      console.log("user details",user)
      createUser(user);

    })
  }
  const handleSignin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (email === "" || password === "") {
      setError("Required field is missing");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          console.log(res);
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.code);
          setError(error.message);
          setLoading(false);
        });
    }
  }
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(false);
    if (email === "" || password === "" || username === "" || occupation === "" || dateofbirth === "") {
      setError("Required field is missing.");
      setLoading(false);
    } else if (!validateEmail(email)) {
      setError("Email is malformed");
      setLoading(false);
    } else {
      createUserWithEmailAndPassword(auth, email, password, occupation, dateofbirth)
        .then((res) => {
         // console.log(res);
          user = {
            displayName  :res.user.displayName ? res.user.displayName : String(res.user.email).split('@')[0],
            email : res.user.email,
            uid: res.user.uid,
            photoURL : res.user.photoURL ? res.user.photoURL : "No Photo"
          };
         // console.log("user details",user)
          createUser(user);
          // Navigate("/");
          history.push("/");
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
          setLoading(false);
        });
    }
  };
  const createUser = async (user) => {
    try {
      const res = await axios.post('/api/user', user);
      console.log("user api",res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth">
      <div className="auth-container">

        <div className='auth-login'>
          <div className='auth-login-container'>
            {register ? (
              <>

                <div className='input-field'>
                  <p>Email</p>
                  <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='input-field'>
                  <p>Username</p>
                  <input type='text' value={username} onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className='input-field'>
                  <p>Password</p>
                  <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <div className='input-field'>
                  <p>Occupation</p>
                  <input type='text' value={occupation} onChange={(e) => setOccupation(e.target.value)}></input>
                </div>
                <div className='input-field'>
                  <p>Date of Birth</p>
                  <input type='date' value={dateofbirth} onChange={(e) => setDateofBirth(e.target.value)}></input>
                </div>

                <button onClick={handleRegister} disabled={loading} style={{ marginTop: "10px" }}>{loading ? 'Registering..!' : 'Register'}</button>

              </>
            ) : (
              <>
                <div className='input-field'>
                  <p>Email</p>
                  <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </div>
                <div className='input-field'>
                  <p>Password</p>
                  <input type='password' value={password} onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button onClick={handleSignin} disabled={loading} style={{ marginTop: "10px" }}>{loading ? 'Signing In...!' : 'Login'}</button>
              </>
            )
            }
            <p onClick={() => setRegister(!register)} id="registerBtn">{register ? "Login" : "Register"}?</p>
          </div>
        </div>
        {
          error !== "" &&(<p style ={{
            color: 'red',
            fontSize: '14px'
          }}>
            {error}
          </p>)
        }
        <p>Other Sign-in option</p>
        <div className='sign-options'>
          <div onClick={handleSignInGoogle} className='single-option'>
          <img class="google-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
            <p>Login With Google</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index