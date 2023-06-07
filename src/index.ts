import dotenv from "dotenv";
import express, { Express } from "express";

import { DataBaseConfig } from "./adapter/driven/infra/config/db.config";
import { Server } from "./adapter/driver/api/config/server.config";
import { produtoRouter } from "./adapter/driver/api/routers/index";
// import ProdutoModel  from "./adapter/driven/infra/models/produtoModel";
// import ImagensProdutoModel from "./adapter/driven/infra/models/produtoImagensModel";
// import CategoriaModel from "./adapter/driven/infra/models/categoriaModel";
import Modelos from "./adapter/driven/infra/models/index";

dotenv.config();

const database = new DataBaseConfig({
    database: process.env.DB_NAME ?? "projeto",
    host: process.env.DB_HOST ?? "localhost",
    userName: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "testtest",
    port: 3306,
})

database.authenticate();
database.synchronizeModels(Modelos);

const app: Express = express();

const server = new Server({ appConfig: app, });

server.addRouter("/api/produto", produtoRouter);

server.init();
