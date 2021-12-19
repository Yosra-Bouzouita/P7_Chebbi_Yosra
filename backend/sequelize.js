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

Post.belongsTo(User);
Like.belongsTo(User);
Like.belongsTo(Post);

//A faire decommenter une seule fois pour creer la BD puis commenter
sequelize.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Post,
  Like,

}