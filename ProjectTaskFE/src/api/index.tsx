import { AllUsersProps, User, getUsersParamsProps } from "../types/types";
import axios from "./axios";

export const getUsers = async (
  params: getUsersParamsProps
): Promise<AllUsersProps> => {
  const { data } = await axios.get("/users", { params });

  return data;
};

export const updateUser = async (params: User): Promise<User> => {
  console.log(params);
  const { data } = await axios.put(`/users/${params._id}`, params);

  return data;
};

export const deleteUser = async (id: string): Promise<number> => {
  const { status } = await axios.delete(`/users/${id}`);
  return status;
};

export const createUser = async (params: User): Promise<User> => {
  const { data } = await axios.post("/users", params);

  return data;
};
