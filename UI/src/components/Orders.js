import React, { useState } from "react";
import { Table, Button, Modal, Select, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Orders = ({ vendors }) => {
  const [orders, setOrders] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newOrder, setNewOrder] = useState({ medicine: "", vendorId: null });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    const vendor = vendors.find((vendor) => vendor.id === newOrder.vendorId);
    const newOrderData = {
      id: orders.length + 1,
      medicine: newOrder.medicine,
      vendorName: vendor ? vendor.name : "Unknown Vendor",
    };
    setOrders([...orders, newOrderData]);
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectVendor = (value) => {
    setNewOrder((prev) => ({ ...prev, vendorId: value }));
  };

  return (
    <div>
      <h2>Medicine Orders</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Order
      </Button>
      <Table
        dataSource={orders}
        columns={[
          { title: "Medicine", dataIndex: "medicine", key: "medicine" },
          { title: "Vendor", dataIndex: "vendorName", key: "vendorName" },
        ]}
        rowKey="id"
        style={{ marginTop: "16px" }}
      />

      <Modal
        title="Add Order"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Medicine">
            <Input
              name="medicine"
              value={newOrder.medicine}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Vendor">
            <Select
              name="vendorId"
              value={newOrder.vendorId}
              onChange={handleSelectVendor}
            >
              {vendors.map((vendor) => (
                <Select.Option key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Orders;
