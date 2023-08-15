import { DataTypes, Model, Sequelize } from "sequelize";

import { Fatura } from "~domain/entities/fatura";
import { ItemDoPedidoDTO } from "~domain/entities/types/itensPedidoType";
import { PedidoDTO, StatusDoPedido, statusDoPedido } from "~domain/entities/types/pedidoType";

import FaturaModel from "./faturaModel";
import ItemDoPedidoModel from "./itemPedidoModel";
import UsuarioModel from "./usuarioModel";

class PedidoModel extends Model<PedidoDTO> implements PedidoDTO {
  public id!: string;
  public clienteId!: string;
  public faturaId!: string;
  public fatura?: Fatura;
  public status!: StatusDoPedido;
  public valor!: number;
  public itens?: ItemDoPedidoDTO[];
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
            statusDoPedido.FALHA
          ],
        },
        valor: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        retiradoEm: {
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
