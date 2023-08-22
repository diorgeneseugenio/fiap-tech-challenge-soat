import { Sequelize } from "sequelize";

export interface DataBaseConfigInterface {
  database: string;
  host: string;
  userName: string;
  password: string;
  port: number;

  getInstance: () => Sequelize;
  authenticate: () => Promise<void>;
}

export type DataBaseConfigConstructorInterface = Pick<
  DataBaseConfigInterface,
  "database" | "host" | "userName" | "password" | "port"
>;
