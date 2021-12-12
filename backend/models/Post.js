
module.exports = (sequelize, type) => {
  return sequelize.define('posts', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date         : type.DATE,
      imageUrl     : type.STRING,
      title        : type.STRING,
      description  : type.STRING,
      likes        : type.INTEGER,

    })
}