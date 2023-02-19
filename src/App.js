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
          <PrivateRoute exact path="/" component={AskMeAnything} />
          {/* <PrivateRoute exact path="/add-question" component={AddQuestion} /> */}
          {/* <PrivateRoute exact path="/question" component={ViewQuestion} /> */}
        </Switch>
        </Router>
      
    </div>
 
  );
}

export default App;
