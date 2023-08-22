import { DataTypes, Model, Sequelize } from 'sequelize';

import { UsuarioDTO } from '~domain/entities/types/UsuarioType';

import PedidoModel from './pedidoModel';

class UsuarioModel extends Model<UsuarioDTO> implements UsuarioDTO {
  public id!: string;
  public cpf!: string | null;
  public nome!: string | null;
  public email!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    UsuarioModel.init({

      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    }, {
      paranoid: true,
      sequelize,
      tableName: 'Usuarios',
      timestamps: true,
      underscored: true,
    });
  }

  static associate(): void {
    this.hasMany(PedidoModel, {
      foreignKey: "cliente_id",
      sourceKey: "id",
      as: "pedido",
    });
  }

}

export default UsuarioModel;