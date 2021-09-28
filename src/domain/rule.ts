import { JsonTree } from "react-awesome-query-builder";

interface ChangeScore {
    Type: "changescore";
    Amount: Number;
}

type Action = ChangeScore;

export interface Rule {
    Name: string;
    Rules: JsonTree;
    Points: number;
}

export interface RuleSet {
    Rules : Rule[];
}
