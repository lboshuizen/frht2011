import React from "react";
import { useSelector } from "react-redux";
import { Rule } from "../../domain/rule";
import { StoreState } from "../../store";
import { Card } from "antd";
import { ScreeningCard } from "./components/screeningcard";

const mapRule = (rule: Rule, label: string | JSX.Element) => {
  const k = rule.Rules.id;
  return (
    <div key={k} style={{ margin: "10px" }}>
      <div>{label}</div>
    </div>
  );
};

const dot = require("../../assets/dot.png");

const View: React.FunctionComponent<{}> = (props) => {
  const { rules, isLoading } = useSelector((s: StoreState) => s.rules);

  const ruleList = Object.keys(rules)
    .sort()
    .map((k, i) =>
      mapRule(
        rules[k],
        <h3>
          {`${i + 1} `}
          {`${rules[k].Name}`}
        </h3>
      )
    );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App flex-container">
      <div className="main-menu">
        <h1>Screening</h1>
        <h2>Rulesets:</h2>
        <div style={{ border: "solid 2px white", borderRadius: "5px" }}>
          <div style={{ float: "left", marginTop: "40px" }}>
            <img src={dot} alt="dot" style={{ marginLeft: "5px" }} />
          </div>
          <div style={{ float: "left", marginLeft: "15px" }}>
            <h3>(CA) Business Rule Set</h3>
            <small>Canadian business and class rules</small>
            <br />
            <h3>Rules:</h3>
            <div>{ruleList}</div>
          </div>
          <div style={{ clear: "both" }} />
        </div>
      </div>
      <Card className="content-area">
        <ScreeningCard />
      </Card>
    </div>
  );
};

export const ScreeningView = View;
