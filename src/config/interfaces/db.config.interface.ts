import { Sequelize } from "sequelize";

export interface DataBaseConfigInterface {
  host: string;
  userName: string;
  password: string;
  port: number;

  getInstance: () => Sequelize;
  authenticate: () => Promise<void>;
}

export type DataBaseConfigConstructorInterface = Pick<
  DataBaseConfigInterface,
  "host" | "userName" | "password" | "port"
>;
