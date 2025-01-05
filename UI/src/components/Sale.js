import React, { useState } from "react";
import { Layout, Input, Modal, Table, Button, Row, Col, Form, InputNumber } from "antd";
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const MedicineSale = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [saleMedicines, setSaleMedicines] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [filteredMedicines, setFilteredMedicines] = useState(null); // List of medicines to display after search

  const medicineData = [
    { id: 1, name: "Paracetamol", quantity: 210, group: "General" },
    { id: 2, name: "Dolo", quantity: 69, group: "Tablet" },
    { id: 3, name: "Ibuprofen", quantity: 50, group: "Painkiller" },
  ];

  const history = useNavigate(); // For navigation

  const handleSearch = (value) => {
    setSearchValue(value);
    if (value.trim() !== "") {
      const results = medicineData.filter((medicine) =>
        medicine.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMedicines(results);
    } else {
      setFilteredMedicines([]);
    }
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicine(medicine);
    setModalVisible(true);
  };

  const handleAddToSale = () => {
    if (quantity > 0 && quantity <= selectedMedicine.quantity) {
      setSaleMedicines([
        ...saleMedicines,
        { ...selectedMedicine, selectedQuantity: quantity },
      ]);
      setModalVisible(false);
      setSearchValue("");
      setFilteredMedicines(null);
      setSelectedMedicine(null);
      setQuantity(0);
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedMedicine(null);
    setQuantity(0);
  };

  const handleDeleteSaleMedicine = (id) => {
    setSaleMedicines(saleMedicines.filter((medicine) => medicine.id !== id));
  };

  const handleViewSales = () => {
    history('/sales-records');
};

  return (
    <Content style={{ padding: "16px", background: "#fff" }}>
      <Row gutter={[16, 16]} style={{ marginBottom: "16px" }}>
        <Col span={24}>
          <Input
            placeholder="Search Medicine"
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Col>
      </Row>

      {filteredMedicines && filteredMedicines.length > 0 && (
        <Table
          dataSource={filteredMedicines}
          columns={[
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Quantity", dataIndex: "quantity", key: "quantity" },
            { title: "Group", dataIndex: "group", key: "group" },
            {
              title: "Action",
              key: "action",
              render: (_, medicine) => (
                <Button type="link" onClick={() => handleMedicineSelect(medicine)}>
                  Select
                </Button>
              ),
            },
          ]}
          pagination={false}
          rowKey="id"
          style={{ marginTop: "16px" }}
        />
      )}

      <Modal
        title="Medicine Details"
        visible={modalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="add"
            type="primary"
            onClick={handleAddToSale}
            disabled={quantity <= 0 || quantity > selectedMedicine?.quantity}
          >
            Add to Sale
          </Button>,
        ]}
      >
        {selectedMedicine && (
          <Form layout="vertical">
            <Form.Item label="Medicine Name">
              <Input value={selectedMedicine.name} readOnly />
            </Form.Item>
            <Form.Item label="Available Quantity">
              <Input value={selectedMedicine.quantity} readOnly />
            </Form.Item>
            <Form.Item label="Select Quantity">
              <InputNumber
                min={1}
                max={selectedMedicine.quantity}
                value={quantity}
                onChange={setQuantity}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

      <Table
        dataSource={saleMedicines}
        columns={[
          { title: "Name", dataIndex: "name", key: "name" },
          { title: "Quantity", dataIndex: "selectedQuantity", key: "selectedQuantity" },
          {
            title: "Action",
            key: "action",
            render: (_, medicine) => (
              <Button type="link" danger onClick={() => handleDeleteSaleMedicine(medicine.id)}>
                Remove
              </Button>
            ),
          },
        ]}
        rowKey="id"
        style={{ marginTop: "16px" }}
        locale={{ emptyText: "No medicine added to sale" }}
      />

      <Row justify="end" style={{ marginTop: "16px" }}>
        <Button type="primary" disabled={saleMedicines.length === 0}>
          Submit
        </Button>
      </Row>

      {/* Sales Records Button */}
      <Row justify="end" style={{ marginTop: "16px" }}>
        <Button type="default" onClick={handleViewSales}>
          View Sales Records
        </Button>
      </Row>
    </Content>
  );
};

export default MedicineSale;
