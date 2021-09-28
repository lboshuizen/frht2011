/*eslint @typescript-eslint/no-unused-vars: ["off", {"varsIgnorePattern": "^_"}]*/
import React from "react";
import merge from "lodash/merge";
import {
  BasicConfig,
  // types:
  Operators,
  Widgets,
  Fields,
  Config,
  Types,
  Conjunctions,
  Settings,
  LocaleSettings,
  Funcs,
} from "react-awesome-query-builder";
import ru_RU from "antd/lib/locale-provider/ru_RU";
import { ruRU } from "@material-ui/core/locale";
import AntdConfig from "react-awesome-query-builder/lib/config/antd";
import AntdWidgets from "react-awesome-query-builder/lib/components/widgets/antd";
const { FieldSelect, FieldDropdown, FieldCascader, FieldTreeSelect } =
  AntdWidgets;
const InitialConfig = AntdConfig; // or BasicConfig or MaterialConfig

//////////////////////////////////////////////////////////////////////

const fields: Fields = {
  ObjectsInsured: {
    label: "ObjectsInsured",
    type: "!struct",
    subfields: {
      Vin: {
        type: "text",
        excludeOperators: ["proximity"],
      },
      IsStolen: {
        type: "boolean",
      },
      listPrice: {
        label: "List Price",
        type: "number",
        preferWidgets: ["number"],
      },
    },
  },
  Party: {
    label: "Party",
    type: "!struct",
    subfields: {
      ClaimIntoxication: {
        type: "boolean",
      },
    },
  },
  Address: {
    label: "Address",
    type: "!struct",
    subfields: {
      Location: {
        type: "select",
        valueSources: ["value"],
        fieldSettings: {
          listValues: [
            { value: "yelindustrial area", title: "Industrial" },
            { value: "rural area", title: "Rural" },
          ],
        },
      },
    },
  },
  Claim: {
    label: "Claim",
    type: "!struct",
    subfields: {
      timeoccured: {
        label: "TimeOccurred",
        type: "time",
        valueSources: ["value"],
        operators: ["greater_or_equal", "less_or_equal", "between"],
        defaultOperator: "between",
      },
      PoliceInvolved: {
        label: "Police Involved",
        type: "boolean",
      },
    },
  },
};

//////////////////////////////////////////////////////////////////////

const conjunctions: Conjunctions = {
  AND: InitialConfig.conjunctions.AND,
  OR: InitialConfig.conjunctions.OR,
};

const operators: Operators = {
  ...InitialConfig.operators,
  // examples of  overriding
  between: {
    ...InitialConfig.operators.between,
    textSeparators: ["from", "to"],
  },
};

const widgets: Widgets = {
  ...InitialConfig.widgets,
  // examples of  overriding
  slider: {
    ...InitialConfig.widgets.slider,
    customProps: {
      width: "300px",
    },
  },
  rangeslider: {
    ...InitialConfig.widgets.rangeslider,
    customProps: {
      width: "300px",
    },
  },
  date: {
    ...InitialConfig.widgets.date,
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD",
  },
  time: {
    ...InitialConfig.widgets.time,
    timeFormat: "HH:mm",
    valueFormat: "HH:mm:ss",
  },
  datetime: {
    ...InitialConfig.widgets.datetime,
    timeFormat: "HH:mm",
    dateFormat: "DD.MM.YYYY",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
  },
  treeselect: {
    ...InitialConfig.widgets.treeselect,
    customProps: {
      showSearch: true,
    },
  },
};

const types: Types = {
  ...InitialConfig.types,
  // examples of  overriding
  boolean: merge(InitialConfig.types.boolean, {
    widgets: {
      boolean: {
        widgetProps: {
          hideOperator: true,
          operatorInlineLabel: "is",
        },
      },
    },
  }),
};

const localeSettings: LocaleSettings = {
  locale: {
    moment: "ru",
    antd: ru_RU,
  },
  valueLabel: "Value",
  valuePlaceholder: "Value",
  fieldLabel: "Field",
  operatorLabel: "Operator",
  fieldPlaceholder: "Select field",
  operatorPlaceholder: "Select operator",
  deleteLabel: null,
  addGroupLabel: "Add group",
  addRuleLabel: "Add rule",
  addSubRuleLabel: "Add sub rule",
  delGroupLabel: null,
  notLabel: "Not",
  valueSourcesPopupTitle: "Select value source",
  removeRuleConfirmOptions: {
    title: "Are you sure delete this rule?",
    okText: "Yes",
    okType: "danger",
  },
  removeGroupConfirmOptions: {
    title: "Are you sure delete this group?",
    okText: "Yes",
    okType: "danger",
  },
};

const settings: Settings = {
  ...InitialConfig.settings,
  ...localeSettings,

  valueSourcesInfo: {
    value: {
      label: "Value",
    },
    field: {
      label: "Field",
      widget: "field",
    },
    func: {
      label: "Function",
      widget: "func",
    },
  },
  // canReorder: false,
  // canRegroup: false,
  // showNot: false,
  // showLabels: true,
  maxNesting: 3,
  canLeaveEmptyGroup: true, //after deletion

  // renderField: (props) => <FieldCascader {...props} />,
  // renderOperator: (props) => <FieldDropdown {...props} />,
  // renderFunc: (props) => <FieldSelect {...props} />,
};

const funcs: Funcs = {};

const config: Config = {
  conjunctions,
  operators,
  widgets,
  types,
  settings,
  fields,
  funcs,
};

export default config;
