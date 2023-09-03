import { DataTypes, Model, Sequelize } from "sequelize";

import MetodoDePagamento from "~domain/entities/metodoDePagamento";

import FaturaModel from "./faturaModel";

class MetodoDePagamentoModel
  extends Model<MetodoDePagamento>
  implements MetodoDePagamento
{
  public id!: string;
  public nome!: string;
  public ativo!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    MetodoDePagamentoModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        ativo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },
      },
      {
        paranoid: true,
        sequelize,
        tableName: "MetodosDePagamento",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasMany(FaturaModel, {
      foreignKey: "metodoDePagamentoId",
    });
  }
}

export default MetodoDePagamentoModel;
