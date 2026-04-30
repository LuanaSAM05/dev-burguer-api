import Sequelize from "sequelize";
import mongoose from "mongoose";
import databaseConfig from "../../src/config/database.cjs";
import Product from "../../src/app/models/Product.js";
import User from "../../src/app/models/User.js";
import Category from "../../src/app/models/Category.js";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.forEach((model) => {
      model.init(this.connection);
    });

    models.forEach((model) => {
      if (typeof model.associate === "function") {
        model.associate(this.connection.models);
      }
    });
  }

  mongo() {
    mongoose
      .connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 10000,
        family: 4
      })
      .then(() => console.log("Mongo conectado"))
      .catch((err) => console.error("Erro Mongo:", err));
  }
}

export default new Database();