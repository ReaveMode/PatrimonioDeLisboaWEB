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
        else conn.query("select idPOI, name, longitude, latitude, description from POI", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.getIMG = function (callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select idPOI_img, url, POI_idPOI from POI_img", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.getComms = function (callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select idPOI_comm, comment, POI_idPOI from POI_comm", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.getRatings = function (callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select rating, POI_idPOI from POI_rating", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}