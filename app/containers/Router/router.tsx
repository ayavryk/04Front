import * as React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from '../App/app';
import HomePage from '../HomePage/home';
import Edit from '../Edit/edit';
import Table from '../Table/table';
export default (
  <Route path="/" component={ App }>
    <IndexRoute component={ HomePage } />
    <Route path="create/:type" component={ Edit } /> 
    <Route path="edit/:type/:id" component={ Edit } />
    <Route path="table/:type" component={ Table } />
  </Route>
);
