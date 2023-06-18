import { Sequelize } from "sequelize";

import {
  DataBaseConfigConstructorInterface,
  DataBaseConfigInterface,
} from "./interfaces/db.config.interface";
import createCategorias from "../seeders/cria-categorias";


interface Model {
  initialize(sequelize: Sequelize): void;
  associate(): void;
}

export class DataBaseConfig implements DataBaseConfigInterface {
  database: string;
  host: string;
  userName: string;
  password: string;
  port: number;
  private instance: Sequelize;

  constructor({
    database,
    host,
    userName,
    password,
    port,
  }: DataBaseConfigConstructorInterface) {
    this.database = database;
    this.host = host;
    this.userName = userName;
    this.password = password;
    this.port = port;

    this.instance = new Sequelize({
      database: this.database,
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

  async synchronizeModels(models: Model[]) {
    try {
      models.forEach(model => {
        model.initialize(this.instance);
      });

      models.forEach(model => {
        if (model.associate) {
          model.associate();
        }
      });
      await this.instance.sync();
      console.log('Modelos sincronizados com o banco de dados.');

      await createCategorias.up(this.instance.getQueryInterface(), this.instance)
    } catch (error) {
      console.error('Erro ao sincronizar modelos com o banco de dados:', error);
    }
  }

}