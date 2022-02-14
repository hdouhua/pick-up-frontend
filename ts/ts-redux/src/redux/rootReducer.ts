import { combineReducers } from "redux";

import employee from './employee';


const reducers = {
  // root state for Employe module
  employee,
  // others...
};

export default combineReducers(reducers);
