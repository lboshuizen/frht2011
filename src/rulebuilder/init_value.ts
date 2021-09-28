import { JsonGroup, Utils as QbUtils } from "react-awesome-query-builder";

export const newRuleId = () : string => QbUtils.uuid();

export function newRule() : JsonGroup {
  return { id: newRuleId(), type: "group" };
};

export const rule = {
  "id": "9a99988a-0123-4456-b89a-b1607f326fd8",
  "type": "group",
  "children1": {
    "99aa98bb-cdef-4012-b456-717c2c6995ac": {
      "type": "rule",
      "properties": {
        "field": "ObjectsInsured.Vin",
        "operator": "equal",
        "value": ["asde"],
        "valueSrc": ["value"],
        "valueType": ["text"]
      }
    }
  }
}

export default 
{
  "type": "group",
  "id": "9a99988a-0123-4456-b89a-b1607f326fd8",
  "children1": {
    "a98ab9b9-cdef-4012-b456-71607f326fd9": {
      "type": "rule",
      "properties": {
        "field": "user.login",
        "operator": "equal",
        "value": [
          "batman"
        ],
        "valueSrc": [
          "value"
        ],
        "valueType": [
          "text"
        ]
      }
    },
    "98a8a9ba-0123-4456-b89a-b16e721c8cd0": {
      "type": "rule",
      "properties": {
        "field": "stock",
        "operator": "equal",
        "value": [
          false
        ],
        "valueSrc": [
          "value"
        ],
        "valueType": [
          "boolean"
        ]
      }
    },
    "aabbab8a-cdef-4012-b456-716e85c65e9c": {
      "type": "rule",
      "properties": {
        "field": "slider",
        "operator": "equal",
        "value": [
          35
        ],
        "valueSrc": [
          "value"
        ],
        "valueType": [
          "number"
        ]
      }
    }
  },
  "properties": {
    "conjunction": "AND",
    "not": false
  }
}
