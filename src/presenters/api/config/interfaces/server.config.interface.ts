import { Express, Router } from "express";

// import { DataBaseConfigInterface } from "../../adapter/driven/infra/config/interfaces/db.config.interface";

export interface ServerInterface {
  appConfig: Express;
  // dataBaseConfig: DataBaseConfigInterface;
  port?: number;
  init: () => Promise<void>;
  addRouter: (routeBase: string, router: Router) => void;
}

export type ServerConstructorInterface = Pick<
  ServerInterface,
  // "dataBaseConfig" | "appConfig"
  "appConfig"
>;
