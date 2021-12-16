const moment = require('moment');

module.exports = (sequelize, type) => {
  return sequelize.define("posts", {
    id          : { type: type.INTEGER,  primaryKey: true,  autoIncrement: true },
    date        : { type: type.DATE,
                    defaultValue:type.NOW,
                    get() {
                      return moment(this.getDataValue('date')).format('YYYY-MM-DD HH:mm:ss');
                  }},
    imageUrl    :   type.STRING,
    title       :   type.STRING,
    description :   type.STRING,
    likes       : { type: type.INTEGER, defaultValue: 0 },
  });
};
