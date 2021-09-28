import { Card } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Rule } from "../domain/rule";
import { StoreState } from "../store";
import { Select, Button } from "antd";
import { claims } from "../storage/claims";

const { Option } = Select;

const mapRule = (rule: Rule, label: string | JSX.Element) => {
  const k = rule.Rules.id;
  var url = "/ruledit/" + k;
  return (
    <div key={k} style={{ margin: "10px" }}>
      <div>{label}</div>
    </div>
  );
};

interface ClaimResult {
  name: string;
  result: number;
}

const mapOptions = (claims: ClaimResult[]) =>
  claims.map((c, i) => <Option value={c.name}>{c.name}</Option>);

const claimList: ClaimResult[] = [
  { name: "Claim1", result: 70 },
  { name: "Claim2", result: 80 },
  { name: "Claim3", result: 50 },
  { name: "Claim4", result: 80 },
  { name: "Claim5", result: 0 },
];

const screen = (claimName: string) => {
  const cl = claimList.findIndex((c) => c.name == claimName);
  if (cl < 0) return 0;

  const claim = claimList[cl];

  return claim.result;
};

const ScreeningCard: React.FunctionComponent<{}> = (props) => {
  const [result, setResult] = useState<number>(0);
  const [claim, setClaim] = useState<string>(claimList[0].name);

  return (
    <Card>
      <h2>Screen</h2>
      <Select
        placeholder="Select a claim"
        style={{ width: "200px" }}
        value={claim}
        onChange={(e) => setClaim(e)}
      >
        {mapOptions(claimList)}
      </Select>
      <Button
        type="primary"
        onClick={() => {
          const r = screen(claim);
          setResult(r);
        }}
      >
        Screen
      </Button>
      <h1>Screening result: {result}</h1>
    </Card>
  );
};

const View: React.FunctionComponent<{}> = (props) => {
  const { rules, isLoading } = useSelector((s: StoreState) => s.rules);

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App flex-container">
      <div className="main-menu">
        <h1>Screening</h1>
        <h2>Ruleset:</h2>
        <div>{ruleList}</div>
      </div>
      <Card className="content-area">
        <ScreeningCard />
      </Card>
    </div>
  );
};

export const ScreeningView = View;
