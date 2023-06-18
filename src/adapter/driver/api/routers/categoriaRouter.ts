import express from "express";

import CategoriaController from "../controllers/categoriaController";
import DBCategoriasRepository from "../../../driven/infra/repository/categoriaDatabaseRepository";
import CategoriaService from "../../../../core/applications/services/categoriaService";

const categoriaRouter = express.Router();

const dbCategoriasRepository = new DBCategoriasRepository();
const categoriaService = new CategoriaService(dbCategoriasRepository);
const categoriaController = new CategoriaController(categoriaService);


categoriaRouter.post("/", categoriaController.criaCategoria.bind(categoriaController));
categoriaRouter.get("/", categoriaController.listaCategorias.bind(categoriaController));
categoriaRouter.get("/:id", categoriaController.retornaCategoria.bind(categoriaController));
categoriaRouter.delete("/:id", categoriaController.deletaCategoria.bind(categoriaController));
categoriaRouter.put("/:id", categoriaController.editaCategoria.bind(categoriaController));


export default categoriaRouter;
