import { DataTypes, Model, Sequelize } from "sequelize";

import { ProdutoDTO } from "~domain/entities/types/produtoType";

import CategoriaModel from "./categoriaModel";
import ImagensProdutoModel from "./produtoImagensModel";

class ProdutoModel extends Model<ProdutoDTO> implements ProdutoDTO {
  public id!: string;
  public nome!: string;
  public categoriaId!: string;
  public preco!: number;
  public descricao!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    ProdutoModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          onDelete: "CASCADE",
        },
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        categoriaId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "Categorias",
            key: "id",
          },
        },
        preco: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        descricao: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        deletedAt: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
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
      },
      {
        paranoid: true,
        sequelize,
        tableName: "Produtos",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.hasMany(ImagensProdutoModel, {
      as: "imagens",
      foreignKey: "produtoId",
      onDelete: "cascade",
      hooks: true,
    });
    this.belongsTo(CategoriaModel, {
      as: "categoria",
      hooks: true,
    });
  }
}

export default ProdutoModel;
