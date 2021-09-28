import React, { Component } from "react";
import {
  Query,
  Builder,
  Utils,
  ImmutableTree,
  Config,
  BuilderProps,
  JsonGroup,
} from "react-awesome-query-builder";
import throttle from "lodash/throttle";
import loadedConfig from "./config_simple";
import { Button } from "antd";

const { getTree, checkTree, loadTree } = Utils;

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

  render = () => {
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
}
