import { Produto } from 'core/domain/produto';
import { DataTypes, Model, Sequelize } from 'sequelize';
import ImagensProdutoModel from './produtoImagensModel';
import CategoriaModel from './categoriaModel';


class ProdutoModel extends Model<Produto> implements Produto {
  public id!: string;
  public nome!: string;
  public categoriaId!: string;
  public preco!: number;
  public descricao!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static initialize(sequelize: Sequelize): void {
    ProdutoModel.init({
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
        onDelete: 'CASCADE',
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // categoria: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   references: {
      //     model: CategoriaModel,
      //     key: 'id'
      //   },
      // },
      categoriaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Categorias',
          key: 'id',
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
    }, {
      sequelize,
      tableName: 'Produtos',
      timestamps: true,
      underscored: true,
    });

  }

  static associate(): void {
    this.hasMany(ImagensProdutoModel, {
      as: 'imagens', foreignKey: 'produtoId', onDelete: 'cascade',
      hooks: true,
    });
    this.belongsTo(CategoriaModel, {
      as: 'categoria',
      hooks: true,
    });
  }

}

export default ProdutoModel;
