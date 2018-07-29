const { Account, User } = require('../../models');
const { AccountFactory, PostFactory, UserFactory } = require('../helpers');
const assert = require('assert');
const dbSync = require('../../db/sync');

describe('Account model', ()=>{

  beforeEach(()=>dbSync(true))

  it (`- should respond to #.create({})`, async ()=>{
    const account = await Account.create({});
    assert(account instanceof Account);
  });


  it (`- should respond to #.reloadWithPosts() and have-many Posts`, async ()=> {
  
    const account = await AccountFactory();

    const post = await PostFactory({ AccountId: account.id });

    await account.reloadWithPosts();

    assert.equal(account.Posts.length, 1);
  
  })

  it (`- should respond to #.addUser(<UserInstance>)`, async ()=>{

    const user = await UserFactory();
    const account = await Account.create({});

    assert(user);
    assert(account);
    
    await account.addUser(user);

    await account.reload({ include: [User] });

    assert(account.Users[0]);

    assert(account.Users[0].id, user.id);

  });

})
