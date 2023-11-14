import {DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes} from 'sequelize'
import sequelize from '../services/dbService'


class Customer extends Model <InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  declare firstName: string;
  declare lastName: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}


Customer.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
}, {
  tableName: "customers",
  sequelize
})

export default Customer;