import express from "express";

import usuarioDatabaseRepository from "~adapter/driven/infra/repository/usuarioDatabaseRepository";
import AuthenticationService from "~core/applications/services/authService";

import AuthenticationController from "../controllers/authController";

const authenticationRouter = express.Router();

const authenticationService = new AuthenticationService(new usuarioDatabaseRepository);
const authenticationController = new AuthenticationController(authenticationService);

authenticationRouter.post(
  "/",
  authenticationController.geraToken.bind(authenticationController)
);

export default authenticationRouter;
