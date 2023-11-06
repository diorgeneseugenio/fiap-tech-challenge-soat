import { DataTypes, Model, Sequelize } from "sequelize";

import { PagamentoDTO } from "~domain/entities/types/PagamentoType";

import FaturaModel from "./faturaModel";

class PagamentoModel
  extends Model<PagamentoDTO>
  implements PagamentoDTO
{
  public id!: string;
  public isPago!: boolean;
  public valorPagamento!: number;
  public tipoDePagamento!: string;
  public pagamentoId!: string;
  public readonly createdAt!: Date;
  public readonly deletedAt!: Date | null;
  public readonly updatedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    PagamentoModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        isPago: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        valorPagamento: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        tipoDePagamento: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        pagamentoId: {
          type: DataTypes.UUID,
          allowNull: false,
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
        tableName: "Pagamentos",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasOne(FaturaModel, {
      foreignKey: 'pagamentoId'
    })

  }
}

export default PagamentoModel;
