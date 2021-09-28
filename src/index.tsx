import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";

import { RuleEditView } from "./views/editrules";
import { ScreeningView } from "./views/screening";

import { Button, Card } from "antd";

import "antd/dist/antd.css";
import "./assets/styles.css";

import { Link, Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const splash = require("./assets/splash.png");

const Home: React.FunctionComponent<{}> = () => {
  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#3A8EDBE5",
        height: "100vh",
      }}
    >
      <Card
        style={{
          marginTop: "250px",
          borderRadius: "20px",
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={{ float: "left", maxWidth: "30%" }}>
          <img src={splash} />
        </div>
        <div style={{ float: "left", maxWidth: "50%", marginLeft: "200px" }}>
          <p style={{ fontWeight: "bolder", fontSize: "25px" }}>
            The importance of a more relevant FRISS score tailored to your
            business
          </p>
          <p style={{ fontSize: "17px" }}>
            A good rule set creates an accurate FRISS score. An accurate FRISS
            score will let you pay legitimate claims faster and detect insurance
            fraud before claims are paid
          </p>
          <div style={{ float: "right", marginTop: "100px" }}>
            <Button
              type="primary"
              style={{
                width: "210px",
                height: "70px",
                borderRadius: "6px",
                fontSize: "24px",
              }}
              onClick={() =>
                (window.location.href =
                  "/ruledit/8bbbba9a-cdef-4012-b456-717c2cd8143b")
              }
            >
              Get Started
            </Button>
          </div>
        </div>
      </Card>
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
