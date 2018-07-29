const { User, Post, Account } = require("../../models");

function UserFactory(options){
  return User.create({
    username: "roy",
    password: "gbiv",
    ...options
  })
}
function PostFactory(options){
  return Post.create({
    ...options
  })
}

function AccountFactory(options){
  return Account.create({});
}

async function UserAccountFactory({ userOptions = {}, accountOptions = {} } ={}){
  const user = await User.create({
    username: "roy",
    password: "gbiv",
  });

  await user.reload({ include: { all: true }});

  const account = await Account.findById(user.Accounts[0].id);

  return { account, user };
}

module.exports = { UserFactory, AccountFactory, PostFactory, UserAccountFactory }
