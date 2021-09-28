import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../store";

import { Card } from "antd";
import RuleBuilder from "../rulebuilder/builder";
import { useParams } from "react-router";

const View: React.FunctionComponent<{}> = () => {
  const rules = useSelector((s: StoreState) => s.rules.rules);
  const { id } = useParams<{ id: string }>();

  const l = Object.keys(rules).map((k) => {
    var url = "/ruledit/" + k;
    return (
      <div key={k}>
        <a style={{ color: "white" }} href={url}>
          {k}
        </a>
      </div>
    );
  });

  const r = rules[id];

  if (r === undefined) {
    return <div>"loading..."</div>;
  }

  console.log("x", id, r);

  return (
    <div className="App flex-container">
      <div className="main-menu">
        <h1>Rule configuration</h1>
        <h2>Rules:</h2>
        <a>New rule</a>
        <div>{l}</div>
      </div>
      <Card className="content-area">
        <RuleBuilder rule={r} />
      </Card>
    </div>
  );
};

export const RuleEditView = View;
