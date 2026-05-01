import { Sequelize, Model } from "sequelize";

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
                url: {
          type: Sequelize.VIRTUAL,
          get() {
            return this.path;
          },
        },
      },
      {
        sequelize,
        tableName: "categories",
      }
    );

    return this; // 🔥 ESSENCIAL
  }
}

export default Category;