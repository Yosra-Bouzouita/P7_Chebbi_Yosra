const Sequelize = require('sequelize')
const UserModel = require('./models/User')
const PostsModel = require('./models/Post')
const LikeModel = require('./models/Like')

const sequelize = new Sequelize('Groupomania', 'root', 'Yosrabouz@1986', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, Sequelize)
const Post = PostsModel(sequelize, Sequelize)
const Like = LikeModel(sequelize, Sequelize)

Post.belongsTo(User, {foreignKey: 'userId'}); // Adds userId to User
Like.belongsTo(User, {foreignKey: 'userId'}); // Adds userId to Like
Like.belongsTo(Post, {foreignKey: 'postId'}); // Adds postId to Like

sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Post,
  Like,

}