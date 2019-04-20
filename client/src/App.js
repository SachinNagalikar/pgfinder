import React, { Component } from 'react';
import './App.css'
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Register from './users/register'
import Login from './users/login'
import Logout from './users/logout'

import PgShow from './component/pg/pgShow'
import PgList from './component/pg/listPg'
import PgNew from './component/pg/newPg'
import PgEdit from './component/pg/editPg'
import Help from './users/help';
import Home from './users/home'
import Navbar from './component/home/navbar'

class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div>
          <Navbar />
          <Switch>
            <Route path='/' component={Home} exact={true} />
            <Route path="/users/register" component={Register} exact={true} />
            <Route path="/users/login" component={Login} exact={true} />
            <Route path="/users/logout" component={Logout} exact={true} />
            <Route path='/help' component={Help} exact={true} />
            <Route path="/pg" component={PgList} exact={true} />
            <Route path="/pg/new" component={PgNew} exact={true} />
            <Route path="/pg/:id" component={PgShow} exact={true} />
            <Route path="/pg/edit/:id" component={PgEdit} exact={true} />
          </Switch>

        </div >
      </BrowserRouter >

    );
  }
}

export default App;
