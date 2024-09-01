import React, { useEffect, useState } from 'react';
import { Layout, Card, Statistic, Row, Col, Avatar, List, Timeline } from 'antd';
import { ShoppingCartOutlined, UserOutlined, BugOutlined, ShoppingOutlined } from '@ant-design/icons';
import DashboardPie from './PiechartEg';
import axios from 'axios';
import apiConfig from '../AppConfig';
import BarGraph from './BarGraph';
const { Header, Content } = Layout;

const Dashboard = () => {
  const [metrics,setMetrics] = useState({})
  // Mock data for charts and lists
  const data = [
    {
      title: 'Human Accountability Designer',
      description: 'The Nagasaki Lander is the trademarked name of several series...',
      time: 'about 23 hours ago'
    },
    {
      title: 'International Marketing Supervisor',
      description: 'New range of formal shirts are designed keeping you in mind...',
      time: 'about 20 hours ago'
    },
    // Add more items as needed
  ];
  useEffect(()=>{
    getMetrics()
  },[])

  const getMetrics= async()=>{
        const res = await axios.get(`${apiConfig.baseURL}/project/metrics/`)
        // console.log(res)
        if (res){
            setMetrics(res.data)
        }
  }
  return (
    <Layout>
      <Header style={{ background: '#fff', padding: 0 }}>
        <h2>Hi, Welcome back 👋</h2>
      </Header>
      <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
      <Row gutter={16}>
      <Col span={6}>
        <Card style={{ borderLeft: '5px solid #52c41a' }}>
          <Statistic
            title="Active Projects"
            value={metrics?metrics.active_projects:'NA'}
            // prefix={<Avatar icon={<ShoppingOutlined />} />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ borderLeft: '5px solid #1890ff' }}>
          <Statistic
            title="Total Projects"
            value={metrics?metrics.projects_count:'NA'}
            // suffix="m"
            // prefix={<Avatar icon={<UserOutlined />} />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ borderLeft: '5px solid #faad14' }}>
          <Statistic
            title="Delivered Projects"
            value={metrics?metrics.delivered_projects:'NA'}
            // suffix="m"
            // prefix={<Avatar icon={<ShoppingCartOutlined />} />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ borderLeft: '5px solid #f5222d' }}>
          <Statistic
            title="On Hold Projects"
            value={metrics?metrics.hold_projects:'NA'}
            // prefix={<Avatar icon={<BugOutlined />} />}
          />
        </Card>
      </Col>
    </Row>

        {/* Charts and Lists */}
        <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card title="P&F">
              {/* Replace with a real line chart */}
              <BarGraph />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Sector wise chart">
              {/* Replace with a real pie chart */}
              <DashboardPie />
            </Card>
          </Col>
        </Row>

        {/* <Row gutter={16} style={{ marginTop: 24 }}>
          <Col span={12}>
            <Card title="News Update">
              <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src="https://via.placeholder.com/150" />}
                      title={item.title}
                      description={item.description}
                    />
                    <div>{item.time}</div>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card title="Order Timeline">
              <Timeline>
                <Timeline.Item color="green">1983 orders, $4220 - Dec 15, 2023</Timeline.Item>
                <Timeline.Item color="blue">12 Invoices have been paid - Jul 20, 2024</Timeline.Item>
              </Timeline>
            </Card>
          </Col>
        </Row> */}
      </Content>
    </Layout>
  );
};

export default Dashboard;
