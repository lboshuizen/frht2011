import React from "react";

interface SummaryProps {}

const ScreeningSummary: React.FunctionComponent<SummaryProps> = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Rule</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>20</td>
        </tr>
      </tbody>
    </table>
  );
};
