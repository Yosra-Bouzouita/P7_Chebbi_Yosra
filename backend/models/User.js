

module.exports = (sequelize, type) => {
  return sequelize.define('user', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      firstname: type.STRING,
      lastname: type.STRING,
      email: {
        type: type.STRING,
        unique: true
      },
      password: type.STRING,
    })
}