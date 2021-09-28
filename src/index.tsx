import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { RuleEditView } from "./views/editrules";
import { ScreeningView } from "./views/screening";
import { Home } from "./views/home";

import "antd/dist/antd.css";
import "./assets/styles.css";

import { Link, Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const LayOut: React.FunctionComponent<{}> = () => {
  return (
    <Router history={history}>
      <div>
        <nav>
          <ul style={{ listStyle: "none" }}>
            <li style={{ float: "left", marginRight: "30px" }}>
              <Link to="/">
                <h2>Home</h2>
              </Link>
            </li>
            <li style={{ float: "left", marginRight: "30px" }}>
              <Link to="/ruledit/8bbbba9a-cdef-4012-b456-717c2cd8143b">
                <h2>Rule editor</h2>
              </Link>
            </li>
            <li style={{ float: "left", marginRight: "30px" }}>
              <Link to="/screening">
                <h2>Screening</h2>
              </Link>
            </li>
          </ul>
        </nav>
        <div style={{ clear: "both" }} />
      </div>

      <Switch>
        <Route path="/ruledit/:id">
          <RuleEditView />
        </Route>
        <Route path="/screening">
          <ScreeningView />
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
