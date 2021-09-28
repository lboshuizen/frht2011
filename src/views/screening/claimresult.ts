export interface ClaimResult {
  name: string;
  result: number;
  subresults: {
    uid: string;
    score: number;
  }[];
}
