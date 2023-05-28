import express from "express";

import ProdutoController from "../controllers/produtoController";
import DBProdutosRepository from "../../../driven/infra/repository/dbProdutoRepository";
import ProdutoService from "../../../../core/applications/services/produtoService";

const produtoRouter = express.Router();

const dbProdutosRepository = new DBProdutosRepository();
const produtoService = new ProdutoService(dbProdutosRepository);
const produtoController = new ProdutoController(produtoService);


produtoRouter.post("/", produtoController.criarProduto.bind(produtoController));
produtoRouter.get("/", produtoController.listarProdutos.bind(produtoController));
produtoRouter.get("/:id", produtoController.pegarProduto.bind(produtoController));
produtoRouter.delete("/:id", produtoController.deletarProduto.bind(produtoController));
produtoRouter.put("/:id", produtoController.editarProduto.bind(produtoController));


export default produtoRouter;
