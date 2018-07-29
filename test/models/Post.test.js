const { Post, Account, User } = require('../../models');
const { UserAccountFactory, AccountFactory } = require('../helpers');
const assert = require('assert');
const dbSync = require('../../db/sync');

describe('Post model', ()=>{

  beforeEach(()=>dbSync(true))

  it(`- should respond to .create({ AccountId:<AccountInstance>.id }) `, async ()=>{
      const account = await Account.create({});
      await Post.create({ AccountId: account.id });
  })

  it(`- should reject .create({}) with SequelizeValidationError `, async ()=>{
    try {
      await Post.create({});
    } catch(e) {
      assert.equal(e.name, 'SequelizeValidationError')
    }
  });


})
