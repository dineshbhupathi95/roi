import React from 'react';
import { Layout } from 'antd';

const Header = () => {
  return (
    <Layout.Header style={{ backgroundColor: '#001529', padding: 0 }}>
      <div style={{ textAlign: 'left', color: '#fff', fontSize: '24px' }}>
        Return Radar
      </div>
    </Layout.Header>
  );
};

export default Header;
