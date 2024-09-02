import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Projects from './components/Projects';
import Users from './components/Users';
import Help from './components/Help';
import Dashboard from './components/Dashboard';
import ProjectDetails from './components/ProjectDetails';

const { Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={() => setCollapsed(!collapsed)}
          width={200}
          style={{ backgroundColor: '#001529' }}
        >
          <Sidebar collapsed={collapsed} />
        </Sider>
        <Layout>
          <Header />
          <Content style={styles.content}>
            <div style={styles.scrollable}>
              <Routes>
              <Route path="/" element={<Dashboard />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/users" element={<Users />} />
                <Route path="/help" element={<Help />} />
                <Route path="/projects/:id" element={<ProjectDetails />} />

              </Routes>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

const styles = {
  content: {
    margin: '24px 16px 0',
    overflow: 'hidden',
    height: 'calc(100vh - 64px)', // Adjust content height based on header height
  },
  scrollable: {
    padding: 24,
    background: '#fff',
    overflowY: 'auto',
    height: '100%',
  },
};

export default App;