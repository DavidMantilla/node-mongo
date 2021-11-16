const express = require("express");
const passport = require('passport');
const Users= require("../models/Users");

//import { renderIndex, renderAbout } from "../controllers/index.controller";

const router = express.Router();

router.get("/users/signin", (req, res) => {
  res.render("users/signin");
});



router.post("/users/signin", passport.authenticate("local", {
  successRedirect: "/notes",
  failureRedirect: "/users/signin",
  failureFlash: true,
}));

router.get("/users/signup", (req, res) => {
  res.render("users/signup");
});

router.post("/users/signup", async(req, res) => {

const {nombre,Correo,clave,confirmclave}= req.body;
const errors=[];
if(clave != confirmclave){
  errors.push({text:"las contraseñas no coinciden"});
}
if(clave.length<4){
  errors.push({text:"la contraseña es menor a cuatro caracteres"});
}
if(errors.length>0){
  res.render("users/signup",{errors,nombre,Correo,clave,confirmclave});
}else{
  
  const user=  Users({name:nombre,email:Correo,password:clave});
  user.password= await user.encryptPassword(clave);
  user.save();
  req.flash('exito',"te has registrado con exito ");
  res.redirect('/users/signin');
}


});

router.get("/users/logout", (req, res) => {
 req.logout();
 res.redirect('/');
});

module.exports = router;
