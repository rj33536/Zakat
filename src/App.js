import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Profile from './components/Profile';
import Search from "./components/SearchDonation"
import './App.css';
import UserContext from "./utils/UserContext";
import { BrowserRouter as Router, Route } from "react-router-dom"
import PostDonation from "./components/PostDonation"
const App = () => {
  const [user, setUser] = React.useState();
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser && JSON.parse(loggedInUser)) {
      const myUser = JSON.parse(loggedInUser);
      console.log(myUser);
      setUser(myUser);
    }

  }, []);


  const Logout = () => {
    localStorage.clear();
    setUser(null);
  }
  return (
    <div className="App">
      <UserContext.Provider value={user}>
        {
          !user ?
            <Login setUser={setUser} />
            :
            (
              <div>

                <Router>
                  <Navbar Logout={Logout} />
                  <Route path="/" exact component={Profile} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/search" component={Search} />
                  <Route path="/donate" component={PostDonation} />
                </Router>
              </div>
            )
        }
      </UserContext.Provider>




    </div>
  );
}

export default App;