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
} from "react-awesome-query-builder";
import throttle from "lodash/throttle";
import loadedConfig from "./config_simple"; // <- you can try './config' for more complex examples
import { rule } from "./init_value";
import loadedInitLogic from "./init_logic";

import { loadRule, rules, storeRule } from "../storage/storage";
import { JsonGroup } from "react-awesome-query-builder/lib";

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

// get init value in JsonTree format:
//export const initValue: JsonTree =
//  loadedInitValue && Object.keys(loadedInitValue).length > 0
//    ? (loadedInitValue as JsonTree)
//    : emptyInitValue;

//console.log(initValue);

//const initTree: ImmutableTree = checkTree(loadTree(initValue), loadedConfig);

// -OR- alternativaly get init value in JsonLogic format:
//const initLogic: JsonLogicTree = loadedInitLogic && Object.keys(loadedInitLogic).length > 0 ? loadedInitLogic : undefined;
//const initTree: ImmutableTree = checkTree(loadFromJsonLogic(initLogic, loadedConfig), loadedConfig);

interface DemoQueryBuilderState {
  tree: ImmutableTree;
  config: Config;
}

interface RuleBuilderProps {
  rule: JsonGroup;
}

export default class RuleBuilder extends Component<
  RuleBuilderProps,
  DemoQueryBuilderState
> {
  private immutableTree: ImmutableTree;
  private config: Config;

  constructor(props: RuleBuilderProps) {
    super(props);

    const r = loadTree(props.rule);

    this.state = {
      tree: r,
      config: loadedConfig,
    };
  }

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

        <button onClick={this.resetValue}>reset</button>
        <button onClick={this.clearValue}>clear</button>
        <button onClick={this.saveRule}>ok</button>

        <div className="query-builder-result">
          {this.renderResult(this.state)}
        </div>
      </div>
    );
  };

  resetValue = () => {
    this.setState({
      tree: checkTree(loadTree(this.props.rule), loadedConfig),
    });
  };

  clearValue = () => {
    this.setState({
      tree: loadTree(emptyInitValue),
    });
  };

  renderBuilder = (props: BuilderProps) => (
    <div className="query-builder-container" style={{ padding: "10px" }}>
      <div className="query-builder">
        <p>When</p>
        <Builder {...props} />
      </div>
      <div className="query-builder">
        <p>Then</p>
      </div>
    </div>
  );

  saveRule = () => {
    const tree = this.immutableTree;
    const jsonTree = getTree(tree);
    storeRule(jsonTree.id, stringify(jsonTree));
  };

  onChange = (immutableTree: ImmutableTree, config: Config) => {
    this.immutableTree = immutableTree;
    this.config = config;
    this.updateResult();

    // `jsonTree` or `logic` can be saved to backend
    // (and then loaded with `loadTree` or `loadFromJsonLogic` as seen above)
    const jsonTree = getTree(immutableTree);
    const { logic, data, errors } = jsonLogicFormat(immutableTree, config);

    //storeRule(jsonTree.id, stringify(jsonTree));
  };

  updateResult = throttle(() => {
    this.setState({ tree: this.immutableTree, config: this.config });
  }, 100);

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
}
