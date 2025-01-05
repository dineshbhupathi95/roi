import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

const Stock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    setStock([
      { product_name: 'Dolo 650', batch_number: '98jhj889', expiry_date: '25-09-2028' ,available_quantity:100},
      { product_name: 'Paracetamol', batch_number: '12bc34de', expiry_date: '10-12-2026',available_quantity:100 },
      { product_name: 'Ibuprofen', batch_number: '34ab56cd', expiry_date: '15-03-2027' ,available_quantity:100},
    ]);
    // Uncomment the below code to fetch data from the API
    // let url = `${apiConfig.baseURL}/project/projects/`;
    // const response = await axios.get(url);
    // if (response) {
    //   setStock(response.data);
    // }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'product_name',
      key: 'product_name',
      render: (text, record) => <Link to={`/stock/${record.product_name}`}>{text}</Link>,
    },
    {
      title: 'Batch Number',
      dataIndex: 'batch_number',
      key: 'batch_number',
    },
    {
      title: 'Availabe Qauntity',
      dataIndex: 'available_quantity',
      key: 'available_quantity',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiry_date',
      key: 'expiry_date',
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => console.log('Add stock modal logic')}>
          Add Stock
        </Button>
      </div> */}
      <Table
        dataSource={stock}
        columns={columns}
        rowKey="batch_number" // Ensure a unique key for each row
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default Stock;


// OLD IMPLE


// import React, { useEffect, useState } from 'react';
// import { Card, Col, Row, Button } from 'antd';
// import { Link } from 'react-router-dom';
// import AddProjectModal from './AddProject';
// import apiConfig from '../AppConfig';
// import axios from 'axios';

// const { Meta } = Card;

// const Stock = () => {
//   const [visible, setVisible] = useState(false);
//   const [stock, setStock] = useState([]);

//   useEffect(() => {
//     getStock();
//   }, []);

//   const getStock = async () => {
//     setStock([
//       {"product_name":"dolo 650","batch_number":"98jhj889","expiry_date":"25-09-2028"}
//     ])
//     // let url = `${apiConfig.baseURL}/project/projects/`;
//     // const response = await axios.get(url);
//     // if (response) {
//     //   setProjects(response.data);
//     // }
//   };

//   return (
//     <div style={{ padding: 24 }}>
//       <Row gutter={[16, 16]}>
//         {stock?.map((project) => (
//           <Col
//             xs={24} // Full width on extra small screens
//             sm={12} // Half width on small screens
//             md={8}  // Third width on medium screens
//             lg={6}  // Quarter width on large screens
//             key={stock.id}
//           >
//             <Link to={`/stock/${stock.id}`}>
//               <Card
//                 hoverable
//                 style={{ width: '100%', marginBottom: 16 }}
//                 cover={
//                   <img
//                     alt="example"
//                     style={{ height: 200 }}
//                     src={`https://via.placeholder.com/240?text=${project.name}`}
//                   />
//                 }
//               >
//                 <Meta title={project.name} />
//                 <div>
//                   <p><strong>Team Name:</strong> {project.team_name}</p>
//                   <p><strong>Team Manager:</strong> {project.manager_name || 'null'}</p>
//                   <p><strong>Project Status:</strong> {project.status || 'NA'}</p>
//                 </div>
//               </Card>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// };

// export default Stock;
