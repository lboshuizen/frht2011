import { Rule } from "../../domain/rule";

import { Action } from "redux-actions";
import { ActionType, deprecated } from "typesafe-actions";

import { listRules, loadRuleFromRef } from "../../storage/storage";

const { createStandardAction } = deprecated;

export const ruleLoaded = createStandardAction("RULE_LOADED")<Rule>();

export const allLoaded = createStandardAction("ALL_RULES_LOADED")<boolean>();

export async function loadRules(dispatch: (action: Action<any>) => any) {
  listRules()
    .then((r) => {
      r.items.forEach(async (i) => {
        const rule = await loadRuleFromRef(i);
        dispatch(ruleLoaded(rule));
      });
      dispatch(allLoaded(true));
    })
    .catch((e: Error) => console.error(e));
}

export type RuleAction = ActionType<typeof actions>;

export const actions = {
  ruleLoaded,
  allLoaded,
};
