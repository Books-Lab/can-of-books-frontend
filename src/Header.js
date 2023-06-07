import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoginButton from './Login';
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './Logout';
// import Profile from './Profile';

class Header extends React.Component {
  render() {
    console.log(this.props.auth0);
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem><Link to="/About" className="nav-link">About</Link></NavItem>
        <NavItem><Link to="/Login" className='nav-link'>{this.props.auth0.isAuthenticated ? <LogoutButton/> : <LoginButton/>}</Link></NavItem>
        <NavItem><Link to="/Profile" className="nav-link">Profile</Link></NavItem>
      </Navbar>
    );
  }
}

export default withAuth0(Header);
