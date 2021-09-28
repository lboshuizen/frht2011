import { JsonGroup } from "react-awesome-query-builder";
import { createReducer } from "typesafe-actions";
import { actions, RuleAction } from "./actions";

export interface RuleRed {
    rules: Record<string,JsonGroup>
}

const inital : RuleRed = {
    rules: {}
}

export const rules = createReducer<RuleRed,RuleAction>(inital)
    .handleAction(actions.ruleLoaded, (s,a) => {
        const rule = a.payload;
        const r = {...s.rules};
        r[ rule.id ] = rule
        return {...s, rules:r};
    });
    