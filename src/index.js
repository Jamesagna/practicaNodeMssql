var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var router = require('../routes/estudiantes');


// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router)

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("Aplicacion corriendo en puerto ", port);
});


