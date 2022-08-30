// Definiciones
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const flash = require('connect-flash');
const passport = require('passport');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

// Dependencia de la llave de la DB
const { database } = require('./keys')

// Inicializaciones
const app = express();
require('./lib/passport');

// Configuraciones
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.set('lib', path.join(__dirname,'lib'));
app.set('view engine','ejs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false})); //Nota Aqui con Subida de Imagenes
app.use(express.json());
app.use(session({
    secret: 'Checador C2K By C2K Team',
    resave: false,
    saveUninitialized: false,
    store:new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// Variables Globales
app.use((req, res, next)=> {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Rutas
app.use(require('./routes/'));
app.use(require('./routes/authentication'));
app.use('/asistente',require('./routes/asistente'));
app.use('/empresas',require('./routes/empresas'));
app.use('/afectaciones',require('./routes/afectaciones'));
app.use('/audit',require('./routes/audit'));
app.use('/categorias',require('./routes/categorias'));
app.use('/departamentos',require('./routes/departamentos'));
app.use('/empleados',require('./routes/empleados'));
app.use('/horarios',require('./routes/horarios'));
app.use('/registros',require('./routes/registros'));
app.use('/permisos',require('./routes/permisos'));
app.use('/periodos',require('./routes/periodos'));
app.use('/accesoretardos',require('./routes/accesoretardos'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Inicialización del Servidor
app.listen(app.get('port'), () => {
    console.log("Servidor en Puerto: ", app.get('port'));
});
