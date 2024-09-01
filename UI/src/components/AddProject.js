import React, { useState } from 'react';
import { Modal, Button, Form, Input, DatePicker, Select, InputNumber, App } from 'antd';
import axios from 'axios';
import apiConfig from '../AppConfig';
import moment from 'moment';

const { Option } = Select;

const AddProjectModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
    const onCreate = async(val) =>{
        console.log(val)
        let payload = {
            "team_members": val['team_members'],
            "name": val['name'],
            "estimated_investment": val['estimate'],
            "estimated_end_date": moment(val['end_date']).format('YYYY-MM-DD'),
            "reason_for_end_date": null,
            "old_end_dates": "",
            "team_name": val['unit'],
            "team_size": val['team_size'],
            "manager": val['manager']
        }
        const res = await axios.post(
            `${apiConfig.baseURL}/project/projects/`,
            payload
        )
        console.log(res)
    }
  return (
    <Modal
      visible={visible}
      title="Create New Project"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label="Project Name"
          rules={[{ required: true, message: 'Please input the name of the project!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="unit"
          label="Project Unit"
          rules={[{ required: true, message: 'Please input the project unit!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="manager"
          label="Project Manager"
          rules={[{ required: true, message: 'Please select the project manager!' }]}
        >
          <Select
            showSearch
            placeholder="Select a manager"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="1">Manager 1</Option>
            <Option value="2">Manager 2</Option>
            <Option value="3">Manager 3</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="estimate"
          label="Project Estimate"
          rules={[{ required: true, message: 'Please input the project estimate!' }]}
        >
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="end_date"
          label="End Date"
          rules={[{ required: true, message: 'Please select the end date!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="team_size"
          label="Team Size"
          rules={[{ required: true, message: 'Please input the team size!' }]}
        >
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="team_members"
          label="Team Members"
          rules={[{ required: true, message: 'Please select the team members!' }]}
        >
          <Select
            mode="multiple"
            allowClear
            placeholder="Select team members"
            style={{ width: '100%' }}
          >
            <Option value="1">Member 1</Option>
            <Option value="2">Member 2</Option>
            <Option value="3">Member 3</Option>
            <Option value="4">Member 4</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

// const Projects = () => {
//   const [visible, setVisible] = useState(false);

//   const onCreate = (values) => {
//     console.log('Received values of form: ', values);
//     setVisible(false);
//   };

//   return (
//     <div>
//       <Button
//         type="primary"
//         onClick={() => {
//           setVisible(true);
//         }}
//       >
//         Add Project
//       </Button>
//       <AddProjectModal
//         visible={visible}
//         onCreate={onCreate}
//         onCancel={() => {
//           setVisible(false);
//         }}
//       />
//     </div>
//   );
// };

export default AddProjectModal;
