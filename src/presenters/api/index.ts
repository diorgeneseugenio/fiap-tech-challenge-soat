import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";

import { Server } from "./config/server.config";
import {
    categoriaRouter,
    metodoPagamento,
    pedidoRouter,
    produtoRouter,
    usuarioRouter,
} from "./routers/index";
import specs from "./swaggerConfig";

export default class API {
    private app: Express;

    constructor() {
        this.app = express();
    }

    start() {
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

        const server = new Server({ appConfig: this.app });

        server.addRouter("/api/categoria", categoriaRouter);
        server.addRouter("/api/produto", produtoRouter);
        server.addRouter("/api/pedido", pedidoRouter);
        server.addRouter("/api/usuario", usuarioRouter);
        server.addRouter("/api/metodoPagamento", metodoPagamento);

        server.init();
    }
}


