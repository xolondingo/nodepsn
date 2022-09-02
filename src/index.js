// Definiciones
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

// Dependencia de la llave de la DB
const { database } = require('./keys.js')

// Inicializaciones
const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('lib', path.join(__dirname,'lib'));
app.set('view engine','ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); //Nota Aqui con Subida de Imagenes
app.use(express.json());
app.use(session({
    secret: 'Alguna cosa secreta',
    resave: false,
    saveUninitialized: false,
    store:new MySQLStore(database)
}));
app.use(flash());

// Variables Globales
app.use((req, res, next)=> {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Rutas
app.use(require('./routes/'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Inicialización del Servidor
app.listen(app.get('port'), () => {
    console.log("Servidor en Puerto: ", app.get('port'));
});
