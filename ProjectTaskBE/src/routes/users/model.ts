import knex from "../../connection/db";
import { User, getUsersParamsProps } from "../../types/types";

export const getUsers = async (
  params: getUsersParamsProps
): Promise<User[]> => {
  console.log(params);
  const result = await knex("users")
    .select()
    .modify((QueryBuilder) => {
      if (params.firstname)
        QueryBuilder.andWhereRaw("users.firstname LIKE ?", [
          `%${params.firstname}%`,
        ]);
      if (params.lastname)
        QueryBuilder.andWhereRaw("users.lastname LIKE ?", [
          `%${params.lastname}%`,
        ]);
      if (params.email)
        QueryBuilder.andWhereRaw("users.email LIKE ?", [`%${params.email}%`]);
      if (params.phonenumber)
        QueryBuilder.andWhereRaw("users.phonenumber LIKE ?", [
          `%${params.phonenumber}%`,
        ]);
    })
    .offset(params.offset)
    .limit(params.limit);

  return result;
};

export const getUserById = async (id: string): Promise<User> => {
  const [result] = await knex("users").select().where("users._id", "=", id);

  return result;
};
export const addNewUser = async (user: User): Promise<User> => {
  const [result] = await knex("users").insert(user).returning("*");

  return result;
};

export const updateUser = async (user: User, id: string): Promise<User> => {
  const [result] = await knex("users")
    .where("_id", "=", id)
    .update(user)
    .returning("*");

  return result;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  return await knex("users").where("_id", "=", id).delete();
};
