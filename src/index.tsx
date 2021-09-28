import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { RuleEditView } from "./views/editrules";

import "antd/dist/antd.css";
import "./assets/styles.css";

import { Link, Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const Home: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <h1>HOME</h1>
    </div>
  );
};

const LayOut: React.FunctionComponent<{}> = () => {
  return (
    <Router history={history}>
      <div>
        <nav>
          <ul style={{ listStyle: "none" }}>
            <li style={{ float: "left", marginRight: "30px" }}>
              <Link to="/">Home</Link>
            </li>
            <li style={{ float: "left", marginRight: "30px" }}>
              <Link to="/ruledit">Rule editor</Link>
            </li>
            <li style={{ float: "left", marginRight: "30px" }}>
              <Link to="/screening">Screening</Link>
            </li>
          </ul>
        </nav>
        <div style={{ clear: "both" }} />
      </div>

      <Switch>
        <Route path="/ruledit/:id">
          <RuleEditView />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <Provider store={store}>
      <LayOut />
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
