import { Sequelize } from "sequelize";

import {
  DataBaseConfigConstructorInterface,
  DataBaseConfigInterface,
} from "./interfaces/db.config.interface";

export class DataBaseConfig implements DataBaseConfigInterface {
  host: string;
  userName: string;
  password: string;
  port: number;
  private instance: Sequelize;

  constructor({
    host,
    userName,
    password,
    port,
  }: DataBaseConfigConstructorInterface) {
    this.host = host;
    this.userName = userName;
    this.password = password;
    this.port = port;

    this.instance = new Sequelize({
      dialect: "mysql",
      host: this.host,
      username: this.userName,
      password: this.password,
      port: this.port,
    });
  }

  getInstance(): Sequelize {
    return this.instance;
  }

  async authenticate(): Promise<void> {
    this.getInstance().authenticate();
  }
}