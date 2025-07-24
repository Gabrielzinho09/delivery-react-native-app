require('dotenv').config();
const express = require('express')
const app = express();
const http = require('http');
const server = http.createServer(app);

const logger = require('morgan')
const cors = require('cors');
const passport = require('passport');

const multer = require('multer');
const io = require('socket.io')(server);

/* Importar socket de donde viene socket

*/
const ordersSocket = require('./sockets/ordersSocket');
/*

* Importar rutas
*/
//usuario
const usersRoutes = require('./routes/userRoutes');
//categorias
const categoriesRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const addressRoutes = require('./routes/addressRoutes');
const orderRoutes = require('./routes/orderRoutes');
const stripeRoutes = require('./routes/stripeRoutes')
const { error } = require('console');



const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.disable('x-powered-by');

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.set('PORT', PORT);
//llamado al socket
ordersSocket(io)
const upload = multer({
    storage: multer.memoryStorage()
})

/*
* llamado de  rutas
*/
usersRoutes(app, upload);
categoriesRoutes(app, upload);
productRoutes(app, upload);
addressRoutes(app);
orderRoutes(app);
stripeRoutes(app);

server.listen(PORT, HOST, function () {
    console.log(`🚀 Server running on http://${HOST}:${PORT}`);
});

//enrutamiento

app.get('/', (req, res) => {
    res.send('Ruta Raiz backend')
});

app.get('/test', (req, res) => {
    res.send('Ruta test backend')
});

//Manejo de error

app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send(err.stack)
});