const express = require('express');
const logger = require('./lib/logger');
const config = require('config');
const dbSync = require('./db/sync');
const cookieSession = require('cookie-session');
const { User } = require('./models'); 

function ProtectWithAuth(req,res,next) {
  try {
    if (req.session.userId) next();
    else throw new Error('NOT AUTHED!')
  } catch(e) {
    next(e);
  }
}

async function Server(){
  await dbSync(true);
  const PORT = config.get('PORT');
  const app = express();
  app.use(require('body-parser').json());
  app.use(cookieSession({
    name: 'session',
    keys: ['$3cr3tzzzzzz'],
    maxAge: 1 * 60 * 60 * 1000 // 1 hour
  }))


  app.post('/auth', async(req,res,next) => {
    try {
      const { username, password } = req.body;
      let user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error('User no exist');
      }
      const result = await user.validatePassword(password);
      if (!result) throw new Error('Invalid Password');
      req.session.userId = user.id;
      res.send(`Hello ${user.username}`);
    } catch(e) {
      next(e);
    } 
  });

  app.post('/user',async (req,res, next)=>{
    try {
      let user = await User.create(req.body);
      res.send(user);
    } catch(e) {
      next(e);
    } 
  });


  //--AUTH ROUTES
  app.use(ProtectWithAuth)

  app.get('/users', async(req,res,next) => {
    try {
      let users = await User.findAll();
      res.send(users);
    } catch(e) {
      next(e);
    } 
  });

  app.get('/', (req,res)=>res.send('Hello World'))
  app.listen(PORT, function(){
    logger.log(`Listening on ${PORT}`);
  });

  return app;
}

if (require.main === module) Server();
module.exports = Server
