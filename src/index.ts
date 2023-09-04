import dotenv from "dotenv";

import { DataBaseConfig } from "~datasources/database/config/db.config";
import Modelos from "~datasources/database/models";
import API from "~presenters/api";


dotenv.config();

const database = new DataBaseConfig({
  database: process.env.DB_NAME ?? "fiap-soat-project_db",
  host: process.env.DB_HOST ?? "localhost",
  userName: process.env.DB_USERNAME ?? "user_tech",
  password: process.env.DB_PASSWORD ?? "testtest",
  port: 3306,
});

async function init() {

  await database.authenticate();
  await database.synchronizeModels(Modelos);
  const api = new API();
  api.start()

}

init();
