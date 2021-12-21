var Sequelize = require("sequelize");
var userModel = require("./User");
var postsModel = require("./Post");
var likeModel = require("./Like");
var commentModel = require("./Comment");
require('dotenv').config();
const bcrypt = require("bcrypt");

var database_model = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

var User = userModel(database_model, Sequelize);
var Post = postsModel(database_model, Sequelize);
var Like = likeModel(database_model, Sequelize);
var Comment = commentModel(database_model, Sequelize);

User.hasMany(Post);
User.hasMany(Like);
User.hasMany(Comment);

Post.hasMany(Like);
Post.hasMany(Comment);

Comment.belongsTo(User);
Post.belongsTo(User);

//A mettre dans .env CREATE_DB=true seule fois pour creer la BD puis mettre  à false
connectToDataBase(process.env.CREATE_DB);

async function connectToDataBase(is_first_connection) {
  if (is_first_connection) {
    database_model.sync({ force: true }).then(() => {
      console.log(`Database & tables created!`);
      bcrypt.hash(process.env.ADMIN_PASSWORD, 10).then((hash) => {
      User.create({
        firstname: process.env.ADMIN_FIRSTNAME,
        lastname: process.env.ADMIN_LASTNAME,
        email: process.env.ADMIN_EMAIL,
        password:hash,
        isAdmin: 1,
      });
    });
    });
  } else {
    try {
      database_model.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
}

module.exports = {
  User,
  Post,
  Like,
  Comment,
};
