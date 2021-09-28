import { createStore, Dispatch } from "redux";
import { StateType } from "typesafe-actions";

import { loadRules } from "./rules/actions";

import { root} from "./root";

export type StoreState = StateType<typeof root>;

export const store = createStore(root);

const populateStore = (dispatch: Dispatch<any>) => {
    console.log("loading");
    loadRules(dispatch);
}

populateStore(store.dispatch);
