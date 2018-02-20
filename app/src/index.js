import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Presentation from './Presentation';
import Controller from './Controller';
import Join from './Join';
import Config from './Config';

const Switch = ({ match }) => {
  const isCtrl = match.params.path === 'ctrl';
  const isJoin = match.params.path === 'join';
  const isAdmin = match.params.path === Config.secret;

  if (isCtrl) {
    return <Route path={`/ctrl/:secret?/:id?`} component={Controller} />;
  }

  if (isJoin) {
    return <Route path="/join/:id?" component={Join} />;
  }

  if (isAdmin) {
    return <Route path={`/:secret?/:id?/:slide?`} component={Presentation} />;
  }

  return <Redirect to="/join" />;
};

const App = () => (
  <Router>
    <div>
      <Route path="/:path?" component={Switch} />
    </div>
  </Router>
);

render(<App />, document.getElementById('app'));

injectGlobal`
  body, html {
    margin: 0;
    padding: 0;
    background: #fff;
    font-family: "Segoe UI", Arial, sans-serif, Helvetica, Tahoma;
    font-weight: 400;
    font-size: 12pt;
    overflow: hidden;
  }
`;
