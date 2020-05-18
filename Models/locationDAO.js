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
        else conn.query("select idPOI, name, img,longitude, latitude, description, img from POI", function (err, rows) {
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
        else conn.query("select name, idPOI_rating, rating from POI_rating, User where User_idUser= idUser and POI_idPOI = ? order by idPOI_rating asc", ids, function (err, rows) {
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



module.exports.postComment = function (obj, callback, next) {
    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("insert into POI_comm (comment,POI_idPOI,User_idUser) values (?,?,?) ", [obj.comment, obj.idPOI, obj.idUser], function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "Comment failed" }, null);
            }
        })
    })
}

module.exports.postRating = function (obj, callback, next) {
    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("insert into POI_rating (rating,POI_idPOI,User_idUser) values (?,?,?) ", [obj.rating, obj.idPOI, obj.idUser], function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "Rating failed" }, null);
            }
        })
    })
}


module.exports.getId = function (idUser, callback, next) {
    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT idUser, name, email, country from User where email = ?", idUser, function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "User not found" }, null);
            }
        })
    })
}


module.exports.register = function (obj, callback, next) {
    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("insert into User (name,email,password, country) values (?,?,?,?)", [obj.name, obj.email, obj.password, obj.country], function (err, rows) {
            conn.release();
            if (!(rows.length === 0)) {
                callback({ code: 200, status: "Ok" }, rows);
            }
            else {
                callback({ code: 401, status: "Invalid data input" }, null);
            }
        })
    })
}


module.exports.getAvg = function (callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("SELECT AVG(rating) as media, POI_idPOI, name from POI_rating, POI where POI_idPOI=idPOI GROUP BY POI_idPOI order by media desc", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.getAllRatings = function (callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from POI_rating", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.getAllComments = function (callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("select * from POI_comm", function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}

module.exports.updateUser = function (obj, callback, next) {

    location.getConnection(function (err, conn) {
        if (err) {
            conn.release();
            next(err);
        }
        else conn.query("UPDATE User set email = ?, country = ? where idUser = ?",[obj.email, obj.country, obj.idUser], function (err, rows) {
            conn.release();
            callback(rows);
        })
    })
}



