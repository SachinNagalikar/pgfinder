import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
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
  DropdownItem,Row,Col,Container } from 'reactstrap';
import Register from './users/register'
import Login from './users/login'

import Help from "./users/help";
class App extends Component {
  render() {
    return (
      <BrowserRouter> 
        <div class="VmOpGe">
          <Container>    
            <Navbar color="light" expand="md">
      <NavbarBrand>pgFinder</NavbarBrand>
              <Col sm={{ size: 'auto', offset: 9 }}>
       <Link to="/users/register">Register</Link>|
      <Link to="/users/login">Login</Link>|
      <Link to='/users/help'>Help</Link></Col> 
              </Navbar>
            </Container>
          <Switch>
            <Route path="/users/register" component={Register} />
            <Route path='/users/login' component={Login} />
            <Route path='/users/help' component={Help}/>
            </Switch>
        </div>
        </BrowserRouter>
    )
  }

}

export default App
