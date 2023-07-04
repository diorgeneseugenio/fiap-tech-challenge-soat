import { DataTypes, Model, Sequelize } from "sequelize";

import { ItemDoPedido } from "~core/domain/itemPedido";
import { Produto } from "~core/domain/produto";

import PedidoModel from "./pedidoModel";
import ProdutoModel from "./produtoModel";

class ItemDoPedidoModel extends Model<ItemDoPedido> implements ItemDoPedido {
  public id!: string;
  public produtoId!: string;
  public produto?: Produto;
  public pedidoId!: string;
  public quantidade!: number;
  public valorUnitario!: number;
  public valorTotal!: number;
  public observacao!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    ItemDoPedidoModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        produtoId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        pedidoId: {
          type: DataTypes.UUID,
          allowNull: true,
        },
        quantidade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        valorUnitario: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        valorTotal: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        observacao: {
          type: DataTypes.STRING,
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
        tableName: "ItensPedido",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(PedidoModel, {
      as: "pedido",
    });

    this.belongsTo(ProdutoModel, {
      as: "produto",
    });
  }
}

export default ItemDoPedidoModel;
