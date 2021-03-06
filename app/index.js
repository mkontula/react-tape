import './css/style.scss'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, Link, browserHistory} from 'react-router';
import TreeTableTest from './tree-table-test';
import FormTest from './form-test';
import MouseTest from './mouse-test';

const App = props =>
  <div>
    <div className="nav">
      <Link to="/">Index</Link>
      <Link to="front">Front</Link>
      <Link to="tree-table">Tree</Link>
      <Link to="form">Tree</Link>
      <Link to="mouse">Mouse</Link>
    </div>
    {props.children}
  </div>
;

const Front = () =>
  <div>
    <h1>Front page</h1>
  </div>
;

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="front" component={Front} />
      <Route path="tree-table" component={TreeTableTest} />
      <Route path="form" component={FormTest} />
      <Route path="mouse" component={MouseTest} />
    </Route>
  </Router>
, document.getElementById('root'));
