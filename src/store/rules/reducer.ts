import { JsonGroup } from "react-awesome-query-builder";
import { createReducer } from "typesafe-actions";
import { Rule } from "../../domain/rule";
import { actions, RuleAction } from "./actions";

export interface RuleRed {
  rules: Record<string, Rule>;
}

const inital: RuleRed = {
  rules: {},
};

export const rules = createReducer<RuleRed, RuleAction>(inital).handleAction(
  actions.ruleLoaded,
  (s, a) => {
    const rule = a.payload;

    console.log("p:", rule);

    const r = { ...s.rules };
    r[rule.Rules.id] = rule;
    return { ...s, rules: r };
  }
);
