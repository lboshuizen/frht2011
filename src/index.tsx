import React from "react";
import ReactDOM from "react-dom";
import { Provider, useSelector } from "react-redux";
import { store, StoreState } from "./store";

import { Card } from "antd";

import "antd/dist/antd.css";
import "./assets/styles.css";

import RuleBuilder from "./rulebuilder/builder";

const View: React.FunctionComponent<{}> = () => {
  const rules = useSelector((s: StoreState) => s.rules.rules);

  const l = Object.keys(rules).map((k) => {
    return <div key={k}>{k}</div>;
  });

  return (
    <div className="App flex-container">
      <div className="main-menu">
        <h1>Rule configuration</h1>
        <h2>Rules:</h2>
        <a>New rule</a>
        <div>{l}</div>
      </div>
      <Card className="content-area">
        <RuleBuilder />
      </Card>
    </div>
  );
};

const App: React.FunctionComponent<{}> = (props) => {
  return (
    <Provider store={store}>
      <View />
    </Provider>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
