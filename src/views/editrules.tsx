import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../store";

import { Card } from "antd";
//import RuleBuilder from "../rulebuilder/builder";
import { RuleEditor } from "../rulebuilder/ruleeditor";

import { useParams } from "react-router";
import { newRule } from "../rulebuilder/init_value";
import { Rule } from "../domain/rule";

const mapRule = (rule: Rule, label: string | JSX.Element) => {
  const k = rule.Rules.id;
  var url = "/ruledit/" + k;
  return (
    <div key={k} style={{ margin: "10px" }}>
      <div>
        <a style={{ color: "white" }} href={url}>
          {label}
        </a>
      </div>
    </div>
  );
};

const View: React.FunctionComponent<{}> = () => {
  const { rules, isLoading } = useSelector((s: StoreState) => s.rules);
  const { id } = useParams<{ id: string }>();

  const nr = newRule();
  const create = mapRule(nr, "New Rule");
  const ruleList = Object.keys(rules)
    .sort()
    .map((k, i) =>
      mapRule(
        rules[k],
        <h2>
          {`${i + 1} `}
          {`${rules[k].Name}`}
        </h2>
      )
    );

  if (Object.keys(rules).length < 1 || isLoading) {
    return <div>Loading...</div>;
  }

  //const ol = [create].concat(ruleList);
  const ol = ruleList;

  const r = rules[id];
  if (r === undefined) {
    return <div>Pending...</div>;
  }

  return (
    <div className="App flex-container">
      <div className="main-menu">
        <h1>Rule configuration</h1>
        <h2>Configured rules:</h2>
        <small>Select a rule to configure it</small>
        <div>{ol}</div>
      </div>
      <Card className="content-area">
        <RuleEditor rule={r} />
      </Card>
    </div>
  );
};

export const RuleEditView = View;
