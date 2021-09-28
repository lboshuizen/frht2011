import React from "react";
import ReactDOM from "react-dom";
import RuleBuilder from "./rulebuilder/builder";

import "antd/dist/antd.css";
import "./assets/styles.css";

import { Card } from "antd";

function App() {
  return (
    <div className="App flex-container">
      <div className="main-menu">
        <h1>Rule configuration</h1>
        <h2>Rules:</h2>
        <div>
          <h3>Rule 1</h3>
          <p>Placeholder</p>
        </div>
        <div>
          <h3>Rule 2</h3>
          <p>Placeholder</p>
        </div>
        <div>
          <h3>Rule 3</h3>
          <p>Placeholder</p>
        </div>
        <div>
          <h3>Rule 4</h3>
          <p>Placeholder</p>
        </div>
        <div>
          <h3>Rule 5</h3>
          <p>Placeholder</p>
        </div>
      </div>
      <Card className="content-area">
        <RuleBuilder />
      </Card>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
