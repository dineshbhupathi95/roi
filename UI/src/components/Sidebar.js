import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  DashboardOutlined,
  ProjectOutlined,
  UserOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import roi from './static/images/roi-2.jpeg'
const Sidebar = ({ collapsed }) => {
  return (
    <div>
      <div style={styles.logo}>
        <img
          src={roi}
          alt="Logo"
          style={collapsed ? styles.logoCollapsed : styles.logoNormal}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['/dashboard']}
        style={{ height: '100%', borderRight: 0 }}
      >
        <Menu.Item key="/dashboard" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="/projects" icon={<ProjectOutlined />}>
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item key="/users" icon={<UserOutlined />}>
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item key="/help" icon={<QuestionCircleOutlined />}>
          <Link to="/help">Help</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

const styles = {
  logo: {
    height: '32px',
    margin: '16px',
    textAlign: 'center',
  },
  logoNormal: {
    height: '32px',
    width: 'auto',
  },
  logoCollapsed: {
    height: '32px',
    width: '32px',
    objectFit: 'cover',
  },
};

export default Sidebar;
