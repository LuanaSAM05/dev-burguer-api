module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,

  username: 'postgres',
  password: '123456',

  database: 'dev_burguer_api',

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};