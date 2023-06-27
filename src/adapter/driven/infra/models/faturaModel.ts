import {
  Fatura,
  StatusDePagamento,
  statusDePagamento,
} from "core/domain/fatura";
import { MetodoDePagamento } from "core/domain/metodoDePagamento";
import { Pedido } from "core/domain/pedido";
import { DataTypes, Model, Sequelize } from "sequelize";

import MetodoDePagamentoModel from "./metodoDePagamentoModel";
import PedidoModel from "./pedidoModel";

class FaturaModel extends Model<Fatura> implements Fatura {
  public id!: string;
  public idPedido!: string;
  public pedido?: Pedido;
  public idMetodoDePagamento!: string;
  public metodoDePagamento?: MetodoDePagamento;
  public statusDePagamento!: StatusDePagamento;
  public pagoEm!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    FaturaModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        idPedido: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        idMetodoDePagamento: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        statusDePagamento: {
          type: DataTypes.ENUM,
          allowNull: true,
          values: [
            statusDePagamento.AGUARDANDO_PAGAMENTO,
            statusDePagamento.ERRO_AO_PROCESSAR_PAGAMENTO,
            statusDePagamento.PAGAMENTO_APROVADO,
            statusDePagamento.PAGAMENTO_NEGADO,
          ],
        },
        pagoEm: {
          type: DataTypes.DATE,
          allowNull: true,
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
        tableName: "Faturas",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasOne(MetodoDePagamentoModel, {
      foreignKey: "idMetodoDePagamento",
      as: "metodoDePagamento",
    });

    this.hasOne(PedidoModel, {
      foreignKey: "idPedido",
      as: "pedido",
    });
  }
}

export default FaturaModel;
