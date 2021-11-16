const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/notes-db-app').then(db=>console.log('DB se ha conectado'))
.catch(err=>console.error(err));
