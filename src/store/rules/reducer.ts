import { createReducer } from "typesafe-actions";
import { Rule } from "../../domain/rule";
import { actions, RuleAction } from "./actions";

export interface RuleRed {
  isLoading: boolean;
  rules: Record<string, Rule>;
}

const inital: RuleRed = {
  isLoading: true,
  rules: {},
};

export const rules = createReducer<RuleRed, RuleAction>(inital)
  .handleAction(actions.ruleLoaded, (s, a) => {
    const rule = a.payload;
    const r = { ...s.rules };
    r[rule.Rules.id] = rule;
    return { ...s, rules: r };
  })
  .handleAction(actions.allLoaded, (s, _) => {
    return { ...s, isLoading: false };
  });
