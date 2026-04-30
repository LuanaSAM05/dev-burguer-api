module.exports = {
  dialect: 'postgres',

  url: process.env.DATABASE_URL,

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },

  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};