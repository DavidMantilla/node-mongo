const express = require('express');
const path = require('path');
const methodOverride=require ('method-override');
const exphbs = require('express-handlebars');
const session= require('express-session');
const flash= require('connect-flash');
const passport = require('passport');
//inicializacion
const app= express();
require('./database');
require('./config/passport');
//settings
app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,"view"))
app.engine('.hbs',exphbs({
   defaultLayout: "main",
   layoutsDir: path.join(app.get("views"), "layouts"),
   partialsDir: path.join(app.get("views"), "partials"),
   extname:'.hbs'


}));
app.set('view engine','.hbs');

//middlewares

app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'));
app.use(session({
    secret:"miappsecreta",
    resave:true,
    saveUninitialized:true

}));
app.use(passport.initialize());
app.use(passport.session())
app.use(flash());


//variables globales

app.use((req,res,next)=>{
   res.locals.success=req.flash('exito');
   res.locals.error=req.flash('error');
   res.locals.user=req.user ||null;

    next();
});
//rutas

app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//archivos estaticos

app.use(express.static(path.join(__dirname,"public")));

//servidor esta escuchando
app.listen(app.get('port'),()=>{
    console.log("Server on port", app.get('port'));
});