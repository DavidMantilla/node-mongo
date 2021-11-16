const express = require('express');

//import { renderIndex, renderAbout } from "../controllers/index.controller";

const router = express.Router();

router.get("/", (req,res)=>{
    res.render('index');
});

router.get("/about", (req,res)=>{
    res.render('about');
    });
    
//router.get("/about", renderAbout);

module.exports= router;