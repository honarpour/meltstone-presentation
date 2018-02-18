import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Presentation from './Presentation';
import Controller from './Controller';

const App = () => (
  <Router>
    <div>
      <Route exact path="/:slide?" component={Presentation} />
      <Route exact path="/ctrl/:instanceId?" component={Controller} />
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
