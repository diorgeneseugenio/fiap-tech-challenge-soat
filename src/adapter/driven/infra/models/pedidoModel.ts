import { Fatura } from "core/domain/fatura";
import { ItensDoPedido } from "core/domain/itemPedido";
import { Pedido, StatusDoPedido, statusDoPedido } from "core/domain/pedido";
import { DataTypes, Model, Sequelize } from "sequelize";

import FaturaModel from "./faturaModel";
import ItemDoPedidoModel from "./itemPedidoModel";

class PedidoModel extends Model<Pedido> implements Pedido {
  public id!: string;
  public idCliente!: string | null;
  public cliente?: any;
  public idFatura?: string;
  public fatura?: Fatura;
  public status!: StatusDoPedido;
  public valor!: number;
  public itens?: ItensDoPedido;
  public retiradoEm!: Date | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  static initialize(sequelize: Sequelize): void {
    PedidoModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
        idCliente: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        idFatura: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        status: {
          type: DataTypes.ENUM,
          allowNull: false,
          defaultValue: statusDoPedido.RASCUNHO,
          values: [
            statusDoPedido.RASCUNHO,
            statusDoPedido.AGUARDANDO_PAGAMENTO,
            statusDoPedido.AGUARDANDO_PREPARO,
            statusDoPedido.EM_PREPARO,
            statusDoPedido.PRONTO,
            statusDoPedido.ENTREGUE,
          ],
        },
        valor: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        retiradoEm: {
          type: DataTypes.DATE,
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
        tableName: "Pedidos",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasOne(FaturaModel, {
      foreignKey: "idFatura",
      as: "fatura",
    });

    this.hasMany(ItemDoPedidoModel, {
      foreignKey: "idPedido",
      as: "itens",
    });

    /** Todo: Adicionar relação com cliente */
  }
}

export default PedidoModel;
