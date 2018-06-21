const bcrypt = require('bcrypt');
const { omit } = require('lodash');
const Sequelize = require('sequelize');
module.exports = (db)=> {
  const User = db.define('User', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  })

  User.beforeCreate(async (user, options) => {
    try {
      user.password = await bcrypt.hash(user.password, 10);
    } catch(e) {
      throw e;
    }
  });

  User.prototype.validatePassword = async function(password){
    const result = await bcrypt.compare(password, this.password);
    return result;
  }

  User.prototype.toJSON = function() {
    return omit(this.dataValues, 'password')
  }


  return User;

};
