import React from "react";
import { Checkbox, Button } from "antd";

import './index.css';


const Setting = () => {
  return (
    <>
      <Checkbox>Notify when new employee joined</Checkbox>
      <div className="buttonWrap">
        <Button type="primary">Save</Button>
      </div>
    </>
  );
};

export default Setting;
