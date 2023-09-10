import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { createUser, deleteUser, getUsers, updateUser } from "../api";
import { AllUsersProps, IColumnsProps, User } from "../types/types";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import FilterDropdown from "../components/filter/Filter";
import Highlight from "../components/filter/Highlighter/Highlighter";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchByFirstName, setSearchByFirstName] = useState<string | null>(
    null
  );
  const [searchByLastName, setSearchByLastName] = useState<string | null>(null);
  const [searchByEmail, setSearchByEmail] = useState<string | null>(null);
  const [searchByNumber, setSearchByNumber] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [rowsLimit, setRowsLimit] = useState<number>(10);
  const [totalItems, setTotalItems] = useState<number>(0);

  const [form] = Form.useForm();

  const { data, isFetched, isSuccess, isLoading, refetch } =
    useQuery<AllUsersProps>("getUsers", () =>
      getUsers({
        page,
        limit: rowsLimit,
        email: searchByEmail,
        phonenumber: searchByNumber,
        firstname: searchByFirstName,
        lastname: searchByLastName,
      })
    );

  const { total, rows }: AllUsersProps = data || { total: 0, rows: [] };

  useEffect(() => {
    if (page == 1 && total) {
      setTotalItems(total);
    }
    refetch();
  }, [
    page,
    total,
    searchByEmail,
    searchByNumber,
    searchByFirstName,
    searchByLastName,
  ]);

  useEffect(() => {
    if (page !== 1) {
      setPage(1);
    } else refetch();
  }, [rowsLimit]);

  const { mutate: mutateUpdate } = useMutation(updateUser, {
    onSuccess: (data) => {
      notification.success({
        message: "Edit profile",
        description: "You have successfully updated user",
      });
      setIsModalOpen(false);
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      notification.error({
        message: "Edit profile",
        description: "There was an error while updating user",
      });
    },
  });

  const { mutate: mutateDelete } = useMutation(deleteUser, {
    onSuccess: (data) => {
      notification.success({
        message: "Edit profile",
        description: "You have successfully deleted user",
      });
      setIsDeleteModalOpen(false);
      refetch();
    },
    onError: (error) => {
      notification.error({
        message: "Edit profile",
        description: "There was an error while deleting user",
      });
    },
  });

  const { mutate: mutateCreateUser } = useMutation(createUser, {
    onSuccess: (data) => {
      notification.success({
        message: "Edit profile",
        description: "You have successfully created user",
      });
      setIsModalOpen(false);
      form.resetFields();
      refetch();
    },
    onError: (error) => {
      notification.error({
        message: "Edit profile",
        description: "There was an error while creating a user",
      });
    },
  });

  useEffect(() => {});

  const handleUpdate = (data: User) => {
    mutateUpdate(data);
  };

  const handleCreate = (data: User) => {
    mutateCreateUser(data);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleCancelDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const columns: IColumnsProps = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "First name",
      dataIndex: "firstname",
      key: "firstname",
      filterIcon: (filtered: boolean): JSX.Element => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      filterDropdown: ({ confirm }): JSX.Element => (
        <FilterDropdown
          filterValue={searchByFirstName}
          placeholder="First name"
          setFilterValue={setSearchByFirstName}
          confirm={confirm}
        />
      ),
      render: (text: string) => {
        return <Highlight text={text} searchByValue={searchByFirstName} />;
      },
    },
    {
      title: "Last name",
      dataIndex: "lastname",
      key: "lastname",
      filterIcon: (filtered: boolean): JSX.Element => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      filterDropdown: ({ confirm }): JSX.Element => (
        <FilterDropdown
          filterValue={searchByLastName}
          placeholder="Last name"
          setFilterValue={setSearchByLastName}
          confirm={confirm}
        />
      ),
      render: (text: string) => {
        return <Highlight text={text} searchByValue={searchByLastName} />;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filterIcon: (filtered: boolean): JSX.Element => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      filterDropdown: ({ confirm }): JSX.Element => (
        <FilterDropdown
          filterValue={searchByEmail}
          placeholder="Email"
          setFilterValue={setSearchByEmail}
          confirm={confirm}
        />
      ),
      render: (text: string): JSX.Element => {
        return <Highlight text={text} searchByValue={searchByEmail} />;
      },
    },
    {
      title: "Phone",
      dataIndex: "phonenumber",
      key: "phonenumber",
      filterIcon: (filtered: boolean): JSX.Element => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      filterDropdown: ({ confirm }): JSX.Element => (
        <FilterDropdown
          filterValue={searchByNumber}
          placeholder="phone"
          setFilterValue={setSearchByNumber}
          confirm={confirm}
        />
      ),
      render: (text: string): JSX.Element => {
        return <Highlight text={text} searchByValue={searchByNumber} />;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (_: string, record: User): JSX.Element => {
        return (
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setIsEditing(true);
                setIsModalOpen(true);
                form.setFieldsValue(record);
              }}
            >
              Edit
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => setIsDeleteModalOpen(true)}
            >
              Delete
            </Button>

            <Modal
              title="Delete User"
              open={isDeleteModalOpen}
              onCancel={handleCancelDeleteModal}
              footer={[
                <Button onClick={handleCancelDeleteModal}>Cancel</Button>,
                <Button
                  type="primary"
                  onClick={() => mutateDelete(record._id)}
                  className="bg-blue-500"
                >
                  Submit
                </Button>,
              ]}
            >
              <h3>Are you sure you want to delete {record.firstname}?</h3>
            </Modal>
          </div>
        );
      },
    },
  ];

  if (isLoading) return null;
  else
    return (
      <div className="mx-5">
        <Button
          type="primary"
          className="mt-8 mb-8 bg-blue-500"
          onClick={() => {
            setIsEditing(false);
            setIsModalOpen(true);
          }}
        >
          Add new user
        </Button>

        <Table
          dataSource={rows}
          columns={columns}
          rowKey="_id"
          pagination={{
            current: page,
            pageSize: rowsLimit,
            total: totalItems,
            onChange: (page) => setPage(page),
            pageSizeOptions: ["10", "20", "50"],
            showSizeChanger: true,
            onShowSizeChange: (current, size) => setRowsLimit(size),
            showTotal: () =>
              `${(page - 1) * rowsLimit + 1} -  ${
                totalItems > page * rowsLimit ? page * rowsLimit : totalItems
              } od ukupno ${totalItems}`,
          }}
        />

        <Modal
          title={isEditing ? "Edit profile" : "Add new User"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={[
            <Button onClick={handleCancel}>Cancel</Button>,
            <Button form="form" key="submit" htmlType="submit">
              Submit
            </Button>,
          ]}
        >
          <Form
            id="form"
            form={form}
            onFinish={isEditing ? handleUpdate : handleCreate}
          >
            <Form.Item name="_id">
              <Input type="hidden" />
            </Form.Item>
            <Form.Item name="firstname" label="First name">
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item name="lastname" label="Last name">
              <Input placeholder="Last name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="phonenumber"
              label="Phone number"
              rules={[{ required: true }]}
            >
              <Input placeholder="Phone number" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
};

export default Home;
