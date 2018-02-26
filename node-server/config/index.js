exports.sequelizeConfig = {
  database: 'test1',
  username: 'root',
  password: 'root',
  options: {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },

    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false
  }
}