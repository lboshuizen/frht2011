import { Utils as QbUtils } from "react-awesome-query-builder";
import { Rule } from "../domain/rule";

export const newRuleId = (): string => QbUtils.uuid();

export function newRule(): Rule {
  return { Rules: { id: newRuleId(), type: "group" }, Points: 0, Name: "" };
}
