import React, { Component } from 'react';
import { Link, Route, BrowserRouter, Switch } from 'react-router-dom'
import Register from './component/user/register'
import PgShow from './component/pg/pgShow'
import PgList from './component/pg/listPg'
import PgNew from './component/pg/newPg'
import PgEdit from './component/pg/editPg'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <h2>PG Finder</h2>
          <Link to="/pg" >PG's</Link> |
          <Link to="/users/register">Register</Link>

          <Switch>
            <Route path="/users/register" component={Register} exact={true}></Route>
            <Route path="/pg" component={PgList} exact={true}></Route>
            <Route path="/pg/new" component={PgNew} exact={true}></Route>
            <Route path="/pg/:id" component={PgShow} exact={true}></Route>
            <Route path="/pg/edit/:id" component={PgEdit} exact={true}></Route>
          </Switch>
        </div>
      </BrowserRouter>

    );
  }
}

export default App;
