import { DataTypes, Model, Sequelize } from 'sequelize';
import ProdutoModel from './produtoModel';
import { ImagensAtributos } from 'core/domain/produto';


class ImagensProdutoModel extends Model<ImagensAtributos> implements ImagensAtributos {
    public id!: number;
    public url!: string;
    public produtoId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static initialize(sequelize: Sequelize): void {
        ImagensProdutoModel.init({
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV1,
                primaryKey: true,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            produtoId: {
                type: DataTypes.UUID,
                allowNull: false,
                onDelete: 'CASCADE',
            }
        }, {
            sequelize,
            tableName: 'ImagensProduto',
            timestamps: true,
            underscored: true,
        });
    }

    static associate(): void {
        this.belongsTo(ProdutoModel, {
            foreignKey: 'produtoId',
            targetKey: 'id'
        });
    }
}

export default ImagensProdutoModel;