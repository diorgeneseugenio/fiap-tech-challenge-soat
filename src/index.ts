import dotenv from "dotenv";
import express, { Express } from "express";

import { DataBaseConfig } from "./config/db.config";
import { Server } from "./config/server.config";
import routerExample from "./routes/example";

dotenv.config();

const database = new DataBaseConfig({
  host: "localhost",
  userName: "root",
  password: "admin",
  port: 3306,
});

const app: Express = express();

const server = new Server({ appConfig: app, dataBaseConfig: database });

server.addRouter("/api/example", routerExample);

server.init();
