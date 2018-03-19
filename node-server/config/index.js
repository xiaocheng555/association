/* 
 * 数据库配置
 */
exports.db = {
  database: 'association',
  username: 'root',
  password: 'root',
  options: {
    // 自定义主机; 默认值: localhost
    host: 'localhost',
     // 自定义端口; 默认值: 依据 dialect 默认
    port: 3306,
     // 数据库的 sql 方言
    dialect: 'mysql',
    // 用于数据库连接池的池配置
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
    operatorsAliases: false,
    // 模型全局配置
    define: {
      // 不改变表名
      freezeTableName: true
    }
  }
}