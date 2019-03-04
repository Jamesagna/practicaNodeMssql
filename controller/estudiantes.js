var database = require('../database')
var sql = database.connect();

class EstudiantesController {
    constructor () {

    }
    async estudiantes(req, res) {
        var request = new sql.Request();
        request.query("select * from [BDInstituto].[dbo].[estudiantes]", function (
            err,
            estudiantes
        ) {
            if (err) console.log(err);
            res.end(JSON.stringify(estudiantes));
        });
    }

    async estudiantesByID(req, res) {
        var request = new sql.Request();
        var stringQuery =
            "select * from [BDInstituto].[dbo].[estudiantes] where Idestudiante = " +
            req.params.id;
        request.query(stringQuery, function (err, estudiante) {
            if (estudiante.recordset == 0) console.log(err);
            res.end(JSON.stringify(estudiante));
        });
    }

    async addEstudiante(req, res) {
        var stringQuery =
            "INSERT INTO [BDInstituto].[dbo].[estudiantes] (Idestudiante,primerApe,segundoApe,nombre,dni,direccion) VALUES (" +
            req.body.id +
            ",'" +
            req.body.primerApe +
            "','" +
            req.body.segundoApe +
            "','" +
            req.body.nombre +
            "','" +
            req.body.dni +
            "','" +
            req.body.direccion +
            "')";
        //var stringQuery = "INSERT INTO [BDInstituto].[dbo].[estudiantes] (Idestudiante,primerApe,segundoApe,nombre,dni,direccion) VALUES (5,'"+"req.body.primerApe"+"','"+"req.body.segundoApe"+"','"+"req.body.nombre"+"','"+"dni"+"','"+"req.body.direccion"+"')";
        sql.query(stringQuery, error => {
            if (error) {
                res.json("ID ya registrado!");
                return console.error("Error: " + error.message);
            }
            console.log("Insertado!");
            res.status(200).json("Insertado!");
        });
    }

    async modEstudiante(req, res) {
        var request = new sql.Request();
        var stringQuery =
            "select * from [BDInstituto].[dbo].[estudiantes] where Idestudiante = " +
            req.params.id;
        request.query(stringQuery, function (err, estudiante) {
            if (estudiante.recordset == 0) {
                res.status(404).json("Ese ID no existe!");
                console.log(err);
            } else {
                var stringQuery2 =
                    "UPDATE [BDInstituto].[dbo].[estudiantes] SET nombre='" +
                    req.body.nombre +
                    "', primerApe='" +
                    req.body.primerApe +
                    "', segundoApe='" +
                    req.body.segundoApe +
                    "', dni='" +
                    req.body.dni +
                    "', direccion='" +
                    req.body.direccion +
                    "'  WHERE Idestudiante=" +
                    req.params.id;
                sql.query(stringQuery2, error => {
                    if (error) {
                        return console.error(error.message);
                    }
                    console.log("Modificado!");
                    res.status(200).json("Modificado!");
                });
            }
        });
    }

    async deleteEstudiante(req, res) {
        var request = new sql.Request();
        var stringQuery =
            "select * from [BDInstituto].[dbo].[estudiantes] where Idestudiante = " +
            req.params.id;
        request.query(stringQuery, function (err, estudiante) {
            if (estudiante.recordset == 0) {
                res.status(404).json("Ese ID no existe!");
                console.log(err);
            } else {
                var stringQuery2 =
                    "DELETE FROM [BDInstituto].[dbo].[estudiantes] WHERE Idestudiante=" +
                    req.params.id;

                sql.query(stringQuery2, error => {
                    if (error) {
                        res.status(201).json("Error al borrar!");
                        return console.error(error.message);
                    }
                    console.log("Borrado!");
                    res.status(200).json("Borrado!");
                });
            }
        });
    }
}
module.exports = new EstudiantesController()