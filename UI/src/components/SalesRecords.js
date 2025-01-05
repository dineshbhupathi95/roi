import React, { useState, useEffect } from "react";
import { Layout, Table, Button, Row, Col, Spin } from "antd";
import { useLocation } from "react-router-dom"; // Import useLocation for receiving passed data

const { Content } = Layout;

const SalesRecords = () => {
  const location = useLocation();
  const { saleMedicines } = location.state || {}; // Get the passed sales data from location.state
  const [data, setData] = useState([]); // To store the fetched sales data
  const [loading, setLoading] = useState(true); // To manage loading state

  // Simulating an API call (you can replace this with your real API logic)
  useEffect(() => {
    if (saleMedicines) {
      // If saleMedicines is passed via the state, use it directly
      setData(saleMedicines);
      setLoading(false);
    } else {
      // In future, trigger the API here when the real data is available
      setTimeout(() => {
        // Simulate API call
        const fetchedData = [
          { id: 1, name: "Paracetamol", selectedQuantity: 5 },
          { id: 2, name: "Dolo", selectedQuantity: 2 },
          { id: 3, name: "Ibuprofen", selectedQuantity: 3 },
        ];
        setData(fetchedData);
        setLoading(false);
      }, 2000); // Simulating a 2-second delay for the API
    }
  }, [saleMedicines]); // Effect will run if saleMedicines changes

  return (
    <Content style={{ padding: "16px", background: "#fff" }}>
      <h2>Sales Records</h2>
      {loading ? (
        <Spin tip="Loading..." style={{ display: "block", margin: "50px auto" }} />
      ) : (
        <Table
          dataSource={data}
          columns={[
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Quantity", dataIndex: "selectedQuantity", key: "selectedQuantity" },
          ]}
          rowKey="id"
          style={{ marginTop: "16px" }}
        />
      )}

      <Row justify="end" style={{ marginTop: "16px" }}>
        <Button type="default" onClick={() => window.history.back()}>
          Back to Medicine Sale
        </Button>
      </Row>
    </Content>
  );
};

export default SalesRecords;
