import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'antd';
import { Link } from 'react-router-dom';
import AddProjectModal from './AddProject';
import apiConfig from '../AppConfig';
import axios from 'axios';

const { Meta } = Card;

const Projects = () => {
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    let url = `${apiConfig.baseURL}/project/projects/`;
    const response = await axios.get(url);
    if (response) {
      setProjects(response.data);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        style={{ marginBottom: 16 }}
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Project
      </Button>
      <AddProjectModal
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      />
      <Button type="primary" style={{ marginBottom: 16, marginLeft: 16 }}>
        Import Data
      </Button>
      <Row gutter={[16, 16]}>
        {projects?.map((project) => (
          <Col
            xs={24} // Full width on extra small screens
            sm={12} // Half width on small screens
            md={8}  // Third width on medium screens
            lg={6}  // Quarter width on large screens
            key={project.id}
          >
            <Link to={`/projects/${project.id}`}>
              <Card
                hoverable
                style={{ width: '100%', marginBottom: 16 }}
                cover={
                  <img
                    alt="example"
                    style={{ height: 200 }}
                    src={`https://via.placeholder.com/240?text=${project.name}`}
                  />
                }
              >
                <Meta title={project.name} />
                <div>
                  <p><strong>Team Name:</strong> {project.team_name}</p>
                  <p><strong>Team Manager:</strong> {project.manager_name || 'null'}</p>
                  <p><strong>Project Status:</strong> {project.status || 'NA'}</p>
                </div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Projects;
