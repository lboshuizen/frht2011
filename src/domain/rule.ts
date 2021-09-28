import { JsonTree } from "react-awesome-query-builder";

interface ChangeScore {
    Type: "changescore";
    Amount: Number;
}

type Action = ChangeScore;

interface Rule {
    Name: string;
    Rules: JsonTree;
    Action: Action;
}

interface RuleSet {
    Rules : Rule[];
}
