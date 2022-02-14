import { Dispatch } from 'redux';

import { get } from '../../utils/request';
// URLs
import {
  URL_GET_EMPLOYEE,
} from '../../constants/urls';
// redux actions
import {
  GET_EMPLOYEE,
} from '../../constants/actions';
// employee models for CRUD
import {
  EmployeeRequest,
  EmployeeResponse,
} from '../../interfaces/employee';
// page state
type State = Readonly<{
  employeeList: EmployeeResponse
}>
// request action
type Action = {
  type: string;
  payload: any;
}


const initialState: State = {
  employeeList: undefined
}

// actions:
export function getEmployee(param: EmployeeRequest) {
  return (dispatch: Dispatch) => {
    get(URL_GET_EMPLOYEE, param).then(res => {
      dispatch({
        type: GET_EMPLOYEE,
        payload: res.data
      });
    });
  }
}

// reducer:
// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action: Action) {
  switch (action.type) {
    case GET_EMPLOYEE:
      return {
        ...state,
        employeeList: action.payload
      }
    default:
      return state
  }
}
