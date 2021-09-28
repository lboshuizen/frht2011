import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../store";

import { Card } from "antd";
import RuleBuilder from "../rulebuilder/builder";
import { useParams } from "react-router";
import { newRule } from "../rulebuilder/init_value";
import { JsonGroup } from "react-awesome-query-builder";
import { JSXElement } from "@babel/types";

const mapRule = (rule: JsonGroup, label: string | JSX.Element) => {
  const k = rule.id;
  var url = "/ruledit/" + rule.id;
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
  const rules = useSelector((s: StoreState) => s.rules.rules);
  const { id } = useParams<{ id: string }>();

  const nr = newRule();
  const create = mapRule(nr, "New Rule");
  const ruleList = Object.keys(rules)
    .sort()
    .map((k, i) => mapRule(rules[k], <h2>{`Rule ${i + 1}`}</h2>));

  if (Object.keys(rules).length == 0) {
    return <div>Loading...</div>;
  }

  const ol = [create].concat(ruleList);

  const r = rules[id] ?? nr;

  return (
    <div className="App flex-container">
      <div className="main-menu">
        <h1>Rule configuration</h1>
        <h2>Rules:</h2>
        <div>{ol}</div>
      </div>
      <Card className="content-area">
        <RuleBuilder rule={r} />
      </Card>
    </div>
  );
};

export const RuleEditView = View;
