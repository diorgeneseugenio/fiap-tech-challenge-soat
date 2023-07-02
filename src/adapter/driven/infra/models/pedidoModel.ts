import { DataTypes, Model, Sequelize } from "sequelize";

import { Fatura } from "~core/domain/fatura";
import { ItensDoPedido } from "~core/domain/itemPedido";
import { Pedido, StatusDoPedido, statusDoPedido } from "~core/domain/pedido";

import FaturaModel from "./faturaModel";
import ItemDoPedidoModel from "./itemPedidoModel";
import UsuarioModel from "./usuarioModel";

class PedidoModel extends Model<Pedido> implements Pedido {
  public id!: string;
  public clienteId!: string | null;
  public cliente?: any;
  public faturaId?: string;
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
        clienteId: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        faturaId: {
          type: DataTypes.UUID,
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
    this.belongsTo(FaturaModel, {
      as: "fatura",
    });

    this.hasMany(ItemDoPedidoModel, {
      foreignKey: "pedidoId",
      sourceKey: "id",
      as: "itens",
    });

    this.belongsTo(UsuarioModel, {
      as: "cliente",
    });
  }
}

export default PedidoModel;
