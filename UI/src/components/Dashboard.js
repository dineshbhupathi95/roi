import React, { useEffect, useState } from 'react';
import { Layout, Card, Statistic, Row, Col } from 'antd';
import DashboardPie from './PiechartEg';
import axios from 'axios';
import apiConfig from '../AppConfig';
import BarGraph from './BarGraph';

const { Header, Content } = Layout;

const Dashboard = () => {
  const [metrics, setMetrics] = useState({});

  useEffect(() => {
    getMetrics();
  }, []);

  const getMetrics = async () => {
    const res = await axios.get(`${apiConfig.baseURL}/project/metrics/`);
    if (res) {
      setMetrics(res.data);
    }
  };

  return (
    <Layout>
      <Header style={{ background: '#fff', padding: '0 16px' }}>
        <h2>Hi, Welcome back 👋</h2>
      </Header>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderLeft: '5px solid #52c41a' }}>
              <Statistic
                title="Active Projects"
                value={metrics ? metrics.active_projects : 'NA'}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderLeft: '5px solid #1890ff' }}>
              <Statistic
                title="Total Projects"
                value={metrics ? metrics.projects_count : 'NA'}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderLeft: '5px solid #faad14' }}>
              <Statistic
                title="Delivered Projects"
                value={metrics ? metrics.delivered_projects : 'NA'}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderLeft: '5px solid #f5222d' }}>
              <Statistic
                title="On Hold Projects"
                value={metrics ? metrics.hold_projects : 'NA'}
              />
            </Card>
          </Col>
        </Row>

        {/* Charts and Lists */}
        <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
          <Col xs={24} md={12}>
            <Card title="P&F">
              <BarGraph />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Sector wise chart">
              <DashboardPie />
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
