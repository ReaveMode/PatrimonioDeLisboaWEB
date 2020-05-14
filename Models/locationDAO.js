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
        else conn.query("select idPOI, name, longitude, latitude, description, img from POI", function (err, rows) {
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

module.exports.getComms = function (ids, callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select idPOI_comm, comment from POI_comm where POI_idPOI = ?", ids, function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "POI not found!" }, null);
            }
        })
    })
}

module.exports.getUsers = function (callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from User", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.getRatings = function (ids, callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select name, idPOI_rating, rating from POI_rating, User where User_idUser= idUser and POI_idPOI = ?", ids, function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "POI not found!" }, null);
            }
        })
    })
}

module.exports.login = function (obj, callback, next) {
    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("Select email,password from User where email=? and password=?", [obj.email, obj.password], function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "User or password incorrects" }, null);
            }
        })
    })
}

