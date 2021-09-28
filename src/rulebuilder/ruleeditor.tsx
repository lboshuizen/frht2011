import React, { useState } from "react";

import { Rule } from "../domain/rule";
import RuleBuilder from "./builder";
import { storeRule } from "../storage/storage";
import { stringify } from "@firebase/util";
import { Button, Input, Card } from "antd";

interface EditorState extends Rule {}

interface Props {
  rule: Rule;
}

const SaveRule = async (rule: Rule) => {
  const id = rule.Rules.id;
  await storeRule(id, stringify(rule));
  window.location.reload();
};

export const RuleEditor: React.FunctionComponent<Props> = (props) => {
  const [state, setState] = useState<EditorState>(props.rule);

  console.log("edit:", state.Rules.id, state.Name);

  return (
    <Card style={{ backgroundColor: "#5484D3", borderRadius: "15px" }}>
      <div>
        <p style={{ display: "inline", color: "white" }}>Rule name</p>
        <Input
          type="text"
          maxLength={20}
          style={{ maxWidth: "100px", marginLeft: "10px" }}
          value={state.Name}
          onChange={(ev) => {
            if (ev.target == null) return;
            const n = ev.target.value;
            setState((prev) => {
              return { ...prev, Name: n };
            });
          }}
        ></Input>
      </div>
      <div>
        <RuleBuilder
          onChange={(t) =>
            setState((prev) => {
              return { ...prev, Rules: t };
            })
          }
          tree={state.Rules}
        />
      </div>
      <div>
        <p style={{ display: "inline", color: "white" }}>Score increase</p>

        <Input
          type="number"
          style={{ maxWidth: "100px", marginLeft: "10px" }}
          value={state.Points}
          onChange={(ev) => {
            const p = parseInt(ev.currentTarget.value, 10);
            setState((prev) => {
              return { ...prev, Points: p };
            });
          }}
        />
      </div>
      <div style={{ marginTop: "15px" }}>
        <Button type="primary" onClick={() => SaveRule(state)}>
          Save
        </Button>
      </div>
    </Card>
  );
};
