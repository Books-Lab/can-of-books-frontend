import React from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import About from './About';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import './main.css';
import Profile from './Profile';
import { withAuth0 } from '@auth0/auth0-react';



class App extends React.Component {
  render() {
    const {isAuthenticated} = this.props.auth0;
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route
              exact path="/"
              element={isAuthenticated && <BestBooks />}
            >
            </Route>
            <Route
              path="/About"
              element={<About />}
            >
            </Route>
           <Route
              path="/Profile"
              element={<Profile />}
            ></Route>
          </Routes>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
