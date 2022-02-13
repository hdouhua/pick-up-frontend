//
// App component
//

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, ConfigProvider } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import { AppRouter } from "../routers";
import './App.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  const location = useLocation();
  let defaultKey = location.pathname.replace('/', '') || 'employee';
  console.debug(defaultKey)

  return (
    <ConfigProvider locale={zh_CN}>
      <Layout>
        <Header>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[defaultKey]}
            className="menu"
          >
            <Menu.Item key="employee"><Link to="/employee">员工管理</Link></Menu.Item>
            <Menu.Item key="setting"><Link to="/setting">系统设置</Link></Menu.Item>
          </Menu>
        </Header>
        <Content className="contentWrap">
          <div className="content">
            <AppRouter />
          </div>
        </Content>
        <Footer className="footer">TypeScript in Action</Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
