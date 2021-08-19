import React, { useState } from 'react';
import jwt from 'jsonwebtoken';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import '../../scss/Navbar.css';

const NavBar = ({ user }) => {
  const [collapsed, setCollapsed] = useState(true);
  let role = '';

  const toggleNavbar = () => setCollapsed(!collapsed);

  if (user !== 'none') {
    const userInfo = jwt.decode(user);
    role = userInfo.user.role;
  }

  return (
    <div>
      <Navbar className='navbar' color='faded' dark>
        <NavbarBrand href='/' className='mr-auto'>
          customKeys
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className='mr-2' />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {user === 'none' && (
              <div>
                <NavItem>
                  <NavLink href='/Register'>Register</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/login'>Login</NavLink>
                </NavItem>
              </div>
            )}
            {role === 'employee' && (
              <div>
                <NavItem>
                  <NavLink href='/logout'>Logout</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/portal'>Employee Portal</NavLink>
                </NavItem>
              </div>
            )}
            {role === 'customer' && (
              <div>
                <NavItem>
                  <NavLink href='/logout'>Logout</NavLink>
                </NavItem>

                <NavItem>
                  <NavLink href='/cart'>Shopping Cart</NavLink>
                </NavItem>
              </div>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
