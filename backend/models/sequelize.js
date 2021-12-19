var Sequelize    = require('sequelize');
var userModel    = require('./User');
var postsModel   = require('./Post');
var likeModel    = require('./Like');
var commentModel = require('./Comment');

var database_model = new Sequelize('Groupomania', 'root', 'Yosrabouz@1986', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

var User    = userModel(database_model, Sequelize);
var Post    = postsModel(database_model, Sequelize);
var Like    = likeModel(database_model, Sequelize);
var Comment = commentModel(database_model, Sequelize);

User.hasMany(Post);
User.hasMany(Like);
User.hasMany(Comment);

Post.hasMany(Like);
Post.hasMany(Comment);

Comment.belongsTo(User);
Post.belongsTo(User);
//A faire decommenter une seule fois pour creer la BD puis commenter
connectToDataBase(true);

async function connectToDataBase(is_first_connection) {
  if (is_first_connection) {
    database_model.sync({ force: true })
      .then(() => {
        console.log(`Database & tables created!`);
        User.create({ firstname: "admin", lastname: "admin", email: "admin@groupomania.com", password: "adminadmin", isAdmin: 1 })
      });
  }
  else {
    try {
      database_model.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

}

module.exports = {
  User ,
  Post,
  Like,
  Comment,

}