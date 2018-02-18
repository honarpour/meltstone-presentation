import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Presentation from './Presentation';
import Controller from './Controller';

const Switch = ({ match }) => {
  const isCtrl = match.params.switch === 'ctrl';

  if (isCtrl) {
    return <Route path="/ctrl/:id?" component={Controller} />;
  }

  return <Route path="/:id?/:slide?" component={Presentation} />;
};

const App = () => (
  <Router>
    <div>
      <Route path="/:switch?" component={Switch} />
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
