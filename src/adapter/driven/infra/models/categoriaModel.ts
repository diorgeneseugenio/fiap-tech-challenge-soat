import { DataTypes, Model, Sequelize } from 'sequelize';
// import ProdutoModel from './produtoModel';
import Categoria from 'core/domain/categorias';
import ProdutoModel from './produtoModel';


class CategoriaModel extends Model<Categoria> implements Categoria {
    public id!: string;
    public nome!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initialize(sequelize: Sequelize): void {
        CategoriaModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            }
        }, {
            paranoid: true,
            sequelize,
            tableName: 'Categorias',
            timestamps: true,
            underscored: true,
        });
    }

    static associate(): void {
        this.hasMany(ProdutoModel, {
            as: 'categorias', foreignKey: 'categoriaId'
        });
    }
}

export default CategoriaModel;