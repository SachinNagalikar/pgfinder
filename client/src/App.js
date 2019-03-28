import React, { Component } from 'react';
import './App.css'
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom'
import {
  Navbar,
  NavbarBrand
   } from 'reactstrap';
import Register from './users/register'
import Login from './users/login'
import PgShow from './component/pg/pgShow'
import PgList from './component/pg/listPg'
import PgNew from './component/pg/newPg'
import PgEdit from './component/pg/editPg'
import Help from './users/help';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="container" >
            <div className="row">
            <Navbar className='light' expand="md">
              <NavbarBrand>PG Finder</NavbarBrand>
            <div className="col-md-2" ></div>
          <Link to="/pg" >PG's</Link> |
          <Link to="/users/register">Register</Link>|
          <Link to="/users/login">Login</Link>|
          <Link to="/users/help">Help</Link>|     
                  </Navbar> 
                  </div>
          </div>
          <Switch>
            <Route path="/users/login" component={Login} />
            <Route path='/users/help' component={Help}/>
            <Route path="/users/register" component={Register} exact={true}/>
            <Route path="/pg" component={PgList} exact={true}/>
            <Route path="/pg/new" component={PgNew} exact={true}/>
            <Route path="/pg/:id" component={PgShow} exact={true}/>
            <Route path="/pg/edit/:id" component={PgEdit} exact={true}/>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
