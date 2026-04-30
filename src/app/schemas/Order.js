import { DataTypes } from "sequelize";
import database from "../../database/index.js";

const Order = database.connection.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    products: {
      type: DataTypes.JSONB,
      allowNull: false,
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

export default Order;