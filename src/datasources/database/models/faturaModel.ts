import { DataTypes, Model, Sequelize } from "sequelize";

import {
  Fatura,
  StatusDePagamento,
  statusDePagamento,
} from "~domain/entities/fatura";
import MetodoDePagamento from "~domain/entities/metodoDePagamento";
import { PedidoDTO } from "~domain/entities/types/pedidoType";

import MetodoDePagamentoModel from "./metodoDePagamentoModel";
import PedidoModel from "./pedidoModel";

class FaturaModel extends Model<Fatura> implements Fatura {
  public id!: string;
  public pedidoId!: string;
  public pedido?: PedidoDTO;
  public metodoDePagamentoId!: string;
  public metodoDePagamento?: MetodoDePagamento;
  public statusDePagamento!: StatusDePagamento;
  public pagoEm!: Date | null;
  public qrCode!: string | null;
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
        pedidoId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        metodoDePagamentoId: {
          type: DataTypes.UUID,
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
        qrCode: {
          type: DataTypes.STRING(10000),
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
    this.belongsTo(MetodoDePagamentoModel, {
      as: "metodoDePagamento",
    });

    this.belongsTo(PedidoModel, {
      as: "pedido",
    });
  }
}

export default FaturaModel;
