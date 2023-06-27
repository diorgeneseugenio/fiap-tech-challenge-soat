import { ItemDoPedido } from "core/domain/itemPedido";
import { Produto } from "core/domain/produto";
import { DataTypes, Model, Sequelize } from "sequelize";

import PedidoModel from "./pedidoModel";
import ProdutoModel from "./produtoModel";

class ItemDoPedidoModel extends Model<ItemDoPedido> implements ItemDoPedido {
  public id!: string;
  public idProduto!: string;
  public produto?: Produto;
  public idPedido!: string;
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
        idProduto: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        idPedido: {
          type: DataTypes.STRING,
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
          type: DataTypes.FLOAT,
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
        tableName: "ItemDoPedidos",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasOne(PedidoModel, {
      foreignKey: "idPedido",
      as: "pedido",
    });

    this.hasOne(ProdutoModel, {
      foreignKey: "idProduto",
      as: "produto",
    });
  }
}

export default ItemDoPedidoModel;
