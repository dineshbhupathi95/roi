import React, { useState } from "react";
import { Table, Button, Modal, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const Vendors = () => {
  const [vendors, setVendors] = useState([
    { id: 1, name: "Vendor A", address: "123 Street", orders: [] },
    { id: 2, name: "Vendor B", address: "456 Avenue", orders: [] },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newVendor, setNewVendor] = useState({ name: "", address: "" });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setVendors([
      ...vendors,
      { id: vendors.length + 1, name: newVendor.name, address: newVendor.address, orders: [] },
    ]);
    setIsModalVisible(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewVendor((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2>Vendors</h2>
      <Button type="primary" icon={<PlusOutlined />} onClick={showModal}>
        Add Vendor
      </Button>
      <Table
        dataSource={vendors}
        columns={[
          { title: "Vendor Name", dataIndex: "name", key: "name" },
          { title: "Address", dataIndex: "address", key: "address" },
          {
            title: "Orders",
            render: (text, record) => (
              <Button
                type="link"
                onClick={() => alert(`View orders for ${record.name}`)}
              >
                View Orders
              </Button>
            ),
          },
        ]}
        rowKey="id"
        style={{ marginTop: "16px" }}
      />

      <Modal
        title="Add Vendor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form>
          <Form.Item label="Vendor Name">
            <Input
              name="name"
              value={newVendor.name}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Address">
            <Input
              name="address"
              value={newVendor.address}
              onChange={handleChange}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Vendors;
