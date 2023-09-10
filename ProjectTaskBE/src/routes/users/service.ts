import { User, getUsersParamsProps } from "../../types/types";
import * as model from "./model";

export const getUsers = async (params: getUsersParamsProps) => {
  let total: number;
  if (params.page == 1) {
    total = (
      await model.getUsers({
        ...params,
        offset: 0,
        limit: Number.MAX_SAFE_INTEGER,
      })
    ).length;
  }
  const rows = await model.getUsers({
    ...params,
    offset: (params.page - 1) * params.limit,
    limit: params.limit,
  });
  return { total, rows };
};

export const getUserById = async (id: string): Promise<User> => {
  return await model.getUserById(id);
};

export const addNewUser = async (user: User): Promise<User> => {
  return await model.addNewUser(user);
};
export const updateUser = async (user: User, id: string): Promise<User> => {
  return await model.updateUser(user, id);
};

export const deleteUser = async (id: string): Promise<boolean> => {
  return await model.deleteUser(id);
};
