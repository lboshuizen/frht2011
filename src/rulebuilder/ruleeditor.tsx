import React, { useState } from "react";

import { Rule } from "../domain/rule";
import RuleBuilder from "./builder";
import { storeRule } from "../storage/storage";
import { stringify } from "@firebase/util";
import { KeyboardReturnOutlined } from "@material-ui/icons";

interface EditorState extends Rule {}

interface Props {
  rule: Rule;
}

const SaveRule = (rule: Rule) => {
  const id = rule.Rules.id;
  storeRule(id, stringify(rule));
};

export const RuleEditor: React.FunctionComponent<Props> = (props) => {
  const [state, setState] = useState<EditorState>(props.rule);

  console.log("edit:", state.Rules.id, state.Name);

  return (
    <div>
      <div>
        <input
          type="text"
          value={state.Name}
          onChange={(ev) => {
            if (ev.target == null) return;
            const n = ev.target.value;
            setState((prev) => {
              return { ...prev, Name: n };
            });
          }}
        ></input>
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
        <input
          type="number"
          value={state.Points}
          onChange={(ev) => {
            const p = parseInt(ev.currentTarget.value, 10);
            setState((prev) => {
              return { ...prev, Points: p };
            });
          }}
        />
      </div>
      <div>
        <button onClick={() => SaveRule(state)}>Save</button>
      </div>
    </div>
  );
};
