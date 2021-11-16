const passport = require('passport')
const local = require('passport-local').Strategy
const User= require('../models/Users')



passport.use(new local(
  {
  usernameField: 'mail',    // define the parameter in req.body that passport can use as username and password
  passwordField: 'password'},
  async (email, password,done)=>{
  const user= await User.findOne({'email':email});
  if(!user ){
      return done(null,false,{message:"No se encuentra el usuario"})
  }else{
     const match= await user.matchPassword(password)
     if (match){
         return done(null,user)
     }else{
        return done(null,false,{message:"la contraseña esta equiocada "})
     }
  }
  }
    ));

passport.serializeUser((user,done)=>{

    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
User.findById(id,(err,user)=>{

    done(err,user)
}).lean()


})