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
  subresults: {
    uid: string;
    score: number;
  }[];
}

const mapOptions = (claims: ClaimResult[]) =>
  claims.map((c, i) => <Option value={c.name}>{c.name}</Option>);

const claimList: ClaimResult[] = [
  { name: "Claim1", result: 70, subresults: [] },
  { name: "Claim2", result: 80, subresults: [] },
  { name: "Claim3", result: 50, subresults: [] },
  { name: "Claim4", result: 80, subresults: [] },
  { name: "Claim5", result: 0, subresults: [] },
];

const screen = (claimName: string) => {
  const cl = claimList.findIndex((c) => c.name == claimName);
  if (cl < 0) return 0;

  const claim = claimList[cl];

  return claim.result;
};

interface SummaryProps {}

const ScreeningSummary: React.FunctionComponent<SummaryProps> = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Rule</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>20</td>
        </tr>
      </tbody>
    </table>
  );
};

const ScreeningCard: React.FunctionComponent<{}> = (props) => {
  const [result, setResult] = useState<number>(0);
  const [claim, setClaim] = useState<string>(claimList[0].name);

  return (
    <Card>
      <h2>Screen</h2>
      <h3>Selected ruleset: (CA) Business Rule Set</h3>
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
      <div style={{ float: "right" }}>
        <h1>Friss score</h1>
        <p style={{ fontSize: "200px", color: "#D2281D" }}>{result}</p>
      </div>
    </Card>
  );
};

const dot = require("../assets/dot.png");

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
            <img src={dot} style={{ marginLeft: "5px" }} />
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
