import React, { useState } from 'react';
import { signInUser, signOutUser } from '../data/auth/firebaseSignInOut';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import signInButton from '../assets/googleSignIn.png';
import nssOverflowLogo from '../assets/NSSOverflowBlack.png';
import messageIcon from '../assets/messageIcon.png';

export default function AppNavbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className='navbar-container'>
      <Navbar expand='md' fixed='top' light>
        <NavbarBrand href='/'>
          <img className='nav-logo' src={nssOverflowLogo} alt='Logo' />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className='container-fluid' navbar>
            <NavItem>SearchBarPH</NavItem>
            {user ? (
              <>
                <UncontrolledDropdown nav inNavbar className='user-drop'>
                  <DropdownToggle nav caret>
                    <img
                      className='user-img'
                      src={user.profilePic}
                      referrerPolicy='no-referrer'
                      alt='user'
                    />
                    <span className='nav-span-user'>{user?.username}</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>
                      <NavLink onClick={signOutUser}>Sign Out</NavLink>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </>
            ) : (
              <>
                <button
                  type='button'
                  className='login-btn-container'
                  onClick={signInUser}
                >
                  <img className='login-btn' src={signInButton} alt='sign in' />
                </button>
              </>
            )}
            <NavItem>
              <NavLink href='/'>
                <img
                  className='nav-message-icon'
                  src={messageIcon}
                  alt='message-icon'
                />
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}
