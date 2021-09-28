import { combineReducers } from 'redux'
import { rules } from './rules/reducer'

const reducer = {
    rules
};

export const root = combineReducers(reducer);
