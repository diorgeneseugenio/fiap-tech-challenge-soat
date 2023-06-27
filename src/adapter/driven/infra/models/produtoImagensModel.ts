import { DataTypes, Model, Sequelize } from "sequelize";

import { ImagemAtributos } from "~core/domain/produto";

import ProdutoModel from "./produtoModel";

class ImagensProdutoModel
  extends Model<ImagemAtributos>
  implements ImagemAtributos
{
  public id!: string;
  public url!: string;
  public produtoId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    ImagensProdutoModel.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        produtoId: {
          type: DataTypes.UUID,
          allowNull: false,
          onDelete: "CASCADE",
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
        tableName: "ImagensProduto",
        timestamps: true,
        underscored: true,
      }
    );
  }

  static associate(): void {
    this.belongsTo(ProdutoModel, {
      foreignKey: "produtoId",
      targetKey: "id",
    });
  }
}

export default ImagensProdutoModel;
