const Sequelize = require('sequelize');
const Haikunator = require('haikunator');
const haikunator = new Haikunator();

module.exports = {
  Name: 'Account',
  Properties: {
    name: {
      type: Sequelize.STRING,
      defaultValue: ()=> haikunator.haikunate()
    },
  },
  Init({ User, Post }){
    this.hasMany(Post);
    this.belongsToMany(User, { 
      through: 'UserAccount', 
      joinTableAttributes: [],
      attributes: [] 
    });
    this.addScope('withPosts', { include: [ Post ] });
  },
  ScopeFunctions: true,
}
