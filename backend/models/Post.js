module.exports = (sequelize, type) => {
  return sequelize.define("posts", {
    id          : { type: type.INTEGER,  primaryKey: true,  autoIncrement: true },
    date        : { type: type.DATE, defaultValue: type.NOW },
    imageUrl    :   type.STRING,
    title       :   type.STRING,
    description :   type.STRING,
    likes       : { type: type.INTEGER, defaultValue: 0 },
  });
};
