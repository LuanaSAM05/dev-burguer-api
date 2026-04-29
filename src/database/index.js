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

    // Inicializa cada model
    models.forEach((model) => {
      model.init(this.connection); // inicializa
    });

    // Cria as associações, se existirem
    models.forEach((model) => {
      if (typeof model.associate === "function") {
        model.associate(this.connection.models);
      }
    });
  }

  mongo() {
    this.mongooseConnection = mongoose.connect(
      'mongodb://localhost:27017/devburguer'
    );
  }
}

export default new Database();