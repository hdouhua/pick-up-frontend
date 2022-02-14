import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Table } from 'antd';

import './index.css';

import QueryForm from './QueryForm';
import { employeeColumns } from './columns';
import { EmployeeRequest, EmployeeResponse } from '../../interfaces/employee';
import { getEmployee } from '../../redux/employee';


interface Props {
  employee: EmployeeResponse;
  onGetEmployee(param: EmployeeRequest): void;
}

class Employee extends Component<Props> {
  render() {
    const { employee: employeeList, onGetEmployee } = this.props;

    return (
      <>
        <QueryForm getData={onGetEmployee} />
        <Table columns={employeeColumns} dataSource={employeeList} className="table" />
      </>
    )
  }
}

const mapStateToProps = (state: any) => ({
  // root state from reducer: state.employee. please refer to `redux/rootReducer.ts`
  employee: state.employee.employeeList
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators({
    onGetEmployee: getEmployee
  }, dispatch)
}


// // 1)
// // `connect` returns a new function that accepts the component to wrap:
// const connectToStore = connect(mapStateToProps, mapDispatchToProps)
// // and that function returns the connected, wrapper component:
// const ConnectedComponent = connectToStore(Employee)
// export default ConnectedComponent;

// 2) We normally do both in one step, like this:
export default connect(mapStateToProps, mapDispatchToProps)(Employee);
