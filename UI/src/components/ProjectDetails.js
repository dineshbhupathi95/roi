import React from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';

const { Meta } = Card;

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()

  const project = {
    id,
    name: `Project ${id}`,
    description: `This is the detailed view of Project ${id}.`,
    details: `More detailed information about Project ${id} can be placed here.`,
  };

  const handleBack =()=>{
    navigate('/projects')
  }

  return (
    <div style={{ padding: 24 }}>
      <Button type="primary" style={{ marginBottom: 16 }} onClick={handleBack}>
        Back
      </Button>
      
      <Card
        title={project.name}
        style={{ width: '100%' }}
        cover={
          <img
            alt="example"
            src={`https://via.placeholder.com/240?text=${project.name}`}
          />
        }
      >
        <Meta description={project.description} />
        <p style={{ marginTop: 16 }}>{project.details}</p>
      </Card>
    </div>
  );
};

export default ProjectDetails;
