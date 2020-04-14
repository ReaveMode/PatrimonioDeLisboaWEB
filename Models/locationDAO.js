var location = require('./db-conn').pool;


module.exports.getPOI = function (callback, next) {
    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from POI", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}


module.exports.getLatLong = function (callback, next) {
    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select name, longitude, latitude from POI", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}
