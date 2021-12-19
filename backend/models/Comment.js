module.exports = (sequelize, type) => {
    return sequelize.define('comments', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        message: {
            type: type.TEXT}
      })
  }