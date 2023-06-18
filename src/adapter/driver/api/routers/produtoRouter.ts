import express from "express";

import ProdutoController from "../controllers/produtoController";
import DBProdutosRepository from "../../../driven/infra/repository/produtoDatabaseRepository";
import ProdutoService from "../../../../core/applications/services/produtoService";

const produtoRouter = express.Router();

const dbProdutosRepository = new DBProdutosRepository();
const produtoService = new ProdutoService(dbProdutosRepository);
const produtoController = new ProdutoController(produtoService);


produtoRouter.post("/", produtoController.criaProduto.bind(produtoController));
produtoRouter.get("/", produtoController.listaProdutos.bind(produtoController));
produtoRouter.get("/:id", produtoController.retornaProduto.bind(produtoController));
produtoRouter.delete("/:id", produtoController.deletaProduto.bind(produtoController));
produtoRouter.put("/:id", produtoController.editaProduto.bind(produtoController));


export default produtoRouter;
