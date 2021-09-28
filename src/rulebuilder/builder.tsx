/*eslint @typescript-eslint/no-unused-vars: ["off", {"varsIgnorePattern": "^_"}]*/
import React, { Component } from "react";
import {
  Query,
  Builder,
  Utils,
  //types:
  ImmutableTree,
  Config,
  BuilderProps,
  JsonTree,
  JsonLogicTree,
  JsonGroup,
} from "react-awesome-query-builder";
import throttle from "lodash/throttle";
import loadedConfig from "./config_simple"; // <- you can try './config' for more complex examples
import { rule } from "./init_value";
import { Button } from "antd";

const loadedInitValue = rule;

const stringify = JSON.stringify;
const {
  queryBuilderFormat,
  jsonLogicFormat,
  getTree,
  checkTree,
  loadTree,
  uuid,
  loadFromJsonLogic,
} = Utils;
const preStyle = {
  backgroundColor: "darkgrey",
  margin: "10px",
  padding: "10px",
};
const preErrorStyle = {
  backgroundColor: "lightpink",
  margin: "10px",
  padding: "10px",
};

const emptyInitValue: JsonTree = { id: uuid(), type: "group" };

interface DemoQueryBuilderState {
  tree: ImmutableTree;
  config: Config;
}

interface RuleBuilderProps {
  tree: JsonGroup;
  onChange: (tree: JsonGroup) => void;
}

export default class RuleBuilder extends Component<
  RuleBuilderProps,
  DemoQueryBuilderState
> {
  private immutableTree: ImmutableTree;
  private config: Config;

  constructor(props: RuleBuilderProps) {
    super(props);

    const r = loadTree(props.tree);

    this.state = {
      tree: r,
      config: loadedConfig,
    };
  }

  /*
        <div className="query-builder-result">
        {this.renderResult(this.state)}
        </div>

*/

  render = () => {
    console.log("render", this.state.tree);
    return (
      <div>
        <Query
          {...loadedConfig}
          value={this.state.tree}
          onChange={this.onChange}
          renderBuilder={this.renderBuilder}
        />

        <Button
          type="dashed"
          danger
          onClick={this.resetValue}
          style={{ float: "right", marginRight: "35px" }}
        >
          reset
        </Button>
      </div>
    );
  };

  resetValue = () => {
    this.setState({
      tree: checkTree(loadTree(this.props.tree), loadedConfig),
    });
  };

  renderBuilder = (props: BuilderProps) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder">
        <p>When</p>
        <Builder {...props} />
      </div>
    </div>
  );

  onChange = (immutableTree: ImmutableTree, config: Config) => {
    this.immutableTree = immutableTree;
    this.config = config;
    this.updateResult();

    const jsonTree = getTree(immutableTree);

    this.props.onChange(jsonTree);
  };

  updateResult = throttle(() => {
    this.setState({ tree: this.immutableTree, config: this.config });
  }, 100);

  /*
  renderResult = ({
    tree: immutableTree,
    config,
  }: {
    tree: ImmutableTree;
    config: Config;
  }) => {
    const { logic, data, errors } = jsonLogicFormat(immutableTree, config);
    return (
      <div>
        <br />
        <div>
          <div>
            jsonLogicFormat
            {errors.length > 0 && (
              <pre style={preErrorStyle}>{stringify(errors, undefined, 2)}</pre>
            )}
            {!!logic && (
              <pre style={preStyle}>
                {"// Rule"}:<br />
                {stringify(logic, undefined, 2)}
                <br />
                <hr />
                {"// Data"}:<br />
                {stringify(data, undefined, 2)}
              </pre>
            )}
          </div>
          <hr />
          <div>
            Tree:
            <pre style={preStyle}>
              {stringify(getTree(immutableTree), undefined, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  };
  */
}
