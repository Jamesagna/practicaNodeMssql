var sql = require("mssql/msnodesqlv8");


class Database {
    connect() {
        //Cadena de conexion
        var dbConfig = {
            server: "DESKTOP-HS5H0QJ",
            user: "sa",
            password: "sapassword",
            database: "BDInstituto"
        };

        //Conectar a la BD
        sql.connect(dbConfig, function (err) {
            if (err) {
                console.log("Error al conectar... " + err);
            }
        });

        return sql;
    }
}

module.exports = new Database()
