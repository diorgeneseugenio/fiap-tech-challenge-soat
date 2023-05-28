import dotenv from "dotenv";
import express, { Express } from "express";

// import { DataBaseConfig } from "../../../config/db.config";
import { Server } from "./adapter/driver/api/config/server.config";
import { produtoRouter } from "./adapter/driver/api/routers/index";

dotenv.config();

// const database = new DataBaseConfig({
//     host: "localhost",
//     userName: "root",
//     password: "admin",
//     port: 3306,
// });

const app: Express = express();

const server = new Server({ appConfig: app, });

server.addRouter("/api/produto", produtoRouter);

server.init();

// console.log('hello world!2')