import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../database/sequelize';

export interface TokenVersionAttributes {
  id: number;
  userId: string;
  tokenVersion: number;
  ip: string;
  revokedAt?: Date | null;
}

export type TokenVersionCreationAttributes = Optional<TokenVersionAttributes, 'id' | 'revokedAt'>;

class TokenVersion extends Model<TokenVersionAttributes, TokenVersionCreationAttributes> implements TokenVersionAttributes {
  public id!: number;
  public userId!: string;
  public tokenVersion!: number;
  public ip!: string;
  public revokedAt?: Date | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

TokenVersion.init(
  {
    id: {
      type: DataTypes.BIGINT,
    //   defaultValue: {
        autoIncrement: true,
    //   },
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'user_id',
    },
    tokenVersion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'token_version',
    },
    ip: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    revokedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'revoked_at',
    },
  },
  {
    sequelize,
    modelName: 'TokenVersion',
    tableName: 'token_versions',
    timestamps: true,
    underscored: true,
  }
);

export default TokenVersion;
