import React, { useState } from "react";
import {
  Table,
  Switch,
  Typography,
  Button,
  Modal,
  Row,
  Col,
  Form,
  Input,
  DatePicker,
} from "antd";

import moment from "moment";

const dataSource = [
  {
    key: "1",
    firstName: "Sham",
    lastName: "Sunder",
    dob: "11-03-1990",
    email: "sham.sunder@hutechsolutions.com",
    mobile: "9988998811",
    status: "Active",
  },
  {
    key: "2",
    firstName: "Surinder",
    lastName: "Kumar",
    dob: "10-02-1986",
    email: "surinder.kumar@hutechsolutions.com",
    mobile: "9988998822",
    status: "Active",
  },
  {
    key: "3",
    firstName: "Pritam",
    lastName: "Singh",
    dob: "10-02-1995",
    email: "pritam.singh@hutechsolutions.com",
    mobile: "9988998833",
    status: "NotActive",
  },
  {
    key: "4",
    firstName: "Rana",
    lastName: "Seth",
    dob: "11-01-2000",
    email: "rana.seth@hutechsolutions.com",
    mobile: "9988998844",
    status: "Active",
  },
];

function Test() {
  const [isActive, setIsActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [tableData, setTableData] = useState(dataSource);
  const [editedRecord, setEditedRecord] = useState(null);
  const [form] = Form.useForm();
  const [updateTable, setUpdateTable] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showEditModal = () => {
    setIsEditModal(true);
  };

  const handleSwitchChange = (checked, record) => {
    setIsActive(checked);
  };
  const handleEditData = (record) => {
    setEditedRecord(record);
  };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Email Id",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => {
        return (
          <>
            <Switch
              defaultChecked={record.status == "Active"}
              //   onChange={
              //     handleSwitchChange
              //     // handle status update logic here
              //   }
            />
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => {
        return (
          <>
            <Typography.Link
              onClick={() => {
                showEditModal(record);
                handleEditData(record);
              }}
            >
              Edit
            </Typography.Link>
          </>
        );
      },
    },
  ];

  const onFinish = (values) => {
    const insertData = {
      firstName: values.firstName,
      lastName: values.lastName,
      mobile: values.mobile,
      email: values.email,
      dob: values.dob.format("DD-MM-YYYY"),
      //   status: true,
    };

    console.log(insertData);

    const temp = [].concat(tableData);
    temp.push(insertData);
    let data = temp.map((user, i) => {
      return {
        key: i.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        mobile: user.mobile,
        email: user.email,
        dob: user.dob,
        status: "Active",
      };
    });
    setTableData(data);
    form.resetFields();
    setIsModalOpen(false);
  };

  const updateData = (values) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => editedRecord.key == item.key);
    if (index > -1) {
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...values });
      setTableData(newData);
      setEditedRecord(null);
    }
    setIsEditModal(false);
  };

  return (
    <div>
      <Button
        className="addUser"
        style={{
          background: "#1677ff",
          color: "#ffffff",
          position: " relative",
          left: "41rem",
          top: "2rem",
          width: "130px",
        }}
        onClick={showModal}
      >
        Add a User
      </Button>
      <Table
        columns={columns}
        dataSource={tableData || updateTable}
        style={{ margin: "40px" }}
      />

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={[16, 16]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name!",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter first Name",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: false,
                    message: "Please enter your last name!",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                label="Mobile"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number!",
                  },
                  {
                    pattern: /^[0-9\b]+$/,
                  },
                ]}
              >
                <Input maxLength={10} placeholder="Mobile" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,

                    message: "Please enter Email Id",
                    type: "email",
                  },
                  {
                    message: "Please enter Valid Email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                label="Date of Birth"
                name="dob"
                rules={[
                  {
                    required: false,
                    message: "Please enter your date of birth!",
                  },
                ]}
              >
                <DatePicker placeholder="Select Date" />
              </Form.Item>
            </Col>
          </Row>
          <Button
            style={{ background: "#1677ff", color: "#ffffff" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Employee Details"
        open={isEditModal}
        footer={null}
        //   afterClose={getData}
        closeIcon={
          <div
            onClick={() => {
              setIsEditModal(false);
            }}
          >
            X
          </div>
        }
        // onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={updateData}>
          <Row gutter={[16, 16]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                initialValue={editedRecord?.firstName}
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Please enter your first name!",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter first Name",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                initialValue={editedRecord?.lastName}
                label="Last Name"
                name="lastName"
                rules={[
                  {
                    required: false,
                    message: "Please enter your last name!",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                initialValue={editedRecord?.mobile}
                label="Mobile"
                name="mobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter your mobile number!",
                  },
                  {
                    pattern: /^[0-9\b]+$/,
                  },
                ]}
              >
                <Input type="number" maxLength={10} placeholder="Mobile" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                initialValue={editedRecord?.email}
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,

                    message: "Please enter Email Id",
                    type: "email",
                  },
                  {
                    message: "Please enter Valid Email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                //   initialValue={data.dob}
                initialValue={moment(editedRecord?.dob, "DD-MM-YYYY")}
                label="Date of Birth"
                name="dob"
                rules={[
                  {
                    required: false,
                    message: "Please enter your date of birth!",
                  },
                ]}
              >
                <DatePicker placeholder="Select Date" />
              </Form.Item>
            </Col>
          </Row>
          <Button
            style={{ background: "#1677ff", color: "#ffffff" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default Test;
