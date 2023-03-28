import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import AskMeAnything from './components/AskMeAnything';
import Auth from './components/Auth';
import {BrowserRouter as Router, Switch , Route, Redirect} from "react-router-dom"; 
import { login, logout, selectUser } from './features/userSlice';
import { useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import Question from './components/AddQuestion/Question';
import ViewQuestions from './components/ViewQuestions';
import ViewUserQuestions from './components/ViewUserQuestions';
import ViewUsers from './components/ViewUsers';
import Bookmarks from './components/Bookmarks';
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      // console.log(authUser);
    });
  }, [dispatch]);
  
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        user ? (

          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/auth",
              state: {
                from: props.location,
              },
            }}
          />
        )
      }
    />
  );
  
  return (
    
    <div className="App">
       <Router>
        <Header />
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={AskMeAnything} />
          <PrivateRoute exact path="/addQuestion" component={Question} />
          <PrivateRoute exact path="/userquestions" component={ViewUserQuestions} />
          <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
          {/* <PrivateRoute exact path="/add-question" component={AddQuestion} /> */}
          <Route exact path="/question" component={ViewQuestions} />
          <Route exact path="/users" component= {ViewUsers} />
        </Switch>
        </Router>
      
    </div>
 
  );
}

export default App;
