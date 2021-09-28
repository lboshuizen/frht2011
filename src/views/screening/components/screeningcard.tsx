import React, { useState } from "react";
import { Card, Select, Button } from "antd";
import { ClaimResult } from "../claimresult";

const { Option } = Select;

const claimList: ClaimResult[] = [
  { name: "Claim1", result: 70, subresults: [] },
  { name: "Claim2", result: 80, subresults: [] },
  { name: "Claim3", result: 50, subresults: [] },
  { name: "Claim4", result: 80, subresults: [] },
  { name: "Claim5", result: 0, subresults: [] },
];

const screen = (claimName: string) => {
  const cl = claimList.findIndex((c) => c.name === claimName);
  if (cl < 0) return 0;

  const claim = claimList[cl];

  return claim.result;
};

const mapOptions = (claims: ClaimResult[]) =>
  claims.map((c, i) => <Option value={c.name}>{c.name}</Option>);

export const ScreeningCard: React.FunctionComponent<{}> = (props) => {
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
