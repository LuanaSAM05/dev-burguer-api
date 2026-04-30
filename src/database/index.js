import Sequelize from "sequelize";
import Product from "../../src/app/models/Product.js";
import User from "../../src/app/models/User.js";
import Category from "../../src/app/models/Category.js";

const models = [User, Product, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(process.env.DATABASE_URL, {
      dialect: "postgres",
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    });

    // 🔌 TESTE DE CONEXÃO COM BANCO
    this.connection
      .authenticate()
      .then(() => console.log("DB conectado ✔"))
      .catch((err) => console.log("DB erro ❌", err));

    // 🔧 inicializa models
    models.forEach((model) => {
      model.init(this.connection);
    });

    // 🔗 associações
    models.forEach((model) => {
      if (typeof model.associate === "function") {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();