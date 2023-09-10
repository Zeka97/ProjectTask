import express, { Application } from "express";

import * as controller from "./controller";

const app: Application = express();

app.get("/", controller.getUsers);
app.get("/:id", controller.getUserById);
app.post("/", controller.addNewUser);
app.put("/:id", controller.updateUser);
app.delete("/:id", controller.deleteUser);

export default app;
