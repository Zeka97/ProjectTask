import Knex from "knex";
import { HOST, USER, PASSWORD, DATABASE } from "../config/config";

const knex = Knex({
  client: "pg",
  connection: {
    host: HOST,
    port: 5432,
    user: USER,
    password: PASSWORD,
    database: DATABASE,
  },
  pool: {
    max: 3,
  },
  acquireConnectionTimeout: 10000,
});

export default knex;
