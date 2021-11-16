const express = require("express");
const note= require("../models/Note");
const {isAuthenticated}= require("../helpers/auth");

//import { renderIndex, renderAbout } from "../controllers/index.controller";

const router = express.Router();

router.get("/notes/add",isAuthenticated, (req, res) => {
  res.render("notes/new");
});
router.post("/notes/add",isAuthenticated,async (req, res) => {
  const { titulo, desc } = req.body;
  const errors = [];
  if (!titulo) {
    errors.push({ text: "escriba un titulo" });
  }
  if (!desc) {
    errors.push({ text: "escriba una descripción" });
  }
  if (errors.length > 0) {
    res.render("notes/new", { errors, titulo, desc });
  } else {
      title=titulo;
      description=desc;
   const nuevanota=  note({title,description});
  
   nuevanota.user=req.user['_id'];
   await nuevanota.save();
   req.flash('exito',"nota agregada satisfactoriamente");
   res.redirect('/notes');
  }
});

router.get("/notes",isAuthenticated,async (req, res) => {
    const notes=await note.find({user:req.user['_id']}).sort({date:'desc'}).lean();
   
    res.render('notes/allnotes',{notes});


});

router.get("/notes/edit/:id",isAuthenticated,async (req, res) => {
   
    const notes=await note.findById(req['params'].id).lean();
  
    res.render('notes/edit',{notes});
});


router.put("/notes/edit/:id",isAuthenticated,async (req, res) => {
    const { titulo, desc } = req.body;
    await note.findByIdAndUpdate(req['params'].id,{ title:titulo,description:desc });
    req.flash('exito',"nota actualizada satisfactoriamente");
    res.redirect('/notes')
});


router.delete("/notes/delete/:id",isAuthenticated,async (req, res) => {
  const { titulo, desc } = req.body;
  await note.findByIdAndDelete(req['params'].id,{ title:titulo,description:desc });
  req.flash('exito',"nota eliminada satisfactoriamente");
  res.redirect('/notes')
});
//router.get("/about", renderAbout);
module.exports = router;
