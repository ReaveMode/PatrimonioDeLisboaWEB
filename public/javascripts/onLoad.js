var marker = {};
var control;
var been_routed = true;
var test = [];
var name;
var latUser;
var longUser;
var locations = [];

window.onload = function () {
    console.log(sessionStorage.getItem("username"))

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            latUser = position.coords.latitude;
            longUser = position.coords.longitude;
            var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 16);
            var attribution = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
            var tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var tiles = L.tileLayer(tileUrl, { attribution });
            tiles.addTo(map);
            $.ajax({
                url: '/api/POI/location',
                method: 'get',
                success: function (result, status) {
                    var test = [L.latLng(position.coords.latitude, position.coords.longitude)];
                    for (x in result) {
                        test.push(L.latLng(result[x].latitude, result[x].longitude))

                    }
                    console.log(test);
                    for (x in test) {
                        console.log(x);
                        if (x == 0) {
                            L.circle([test[x].lat, test[x].lng], { draggable: false, color: 'Blue', fillColor: '#00008B', fillOpacity: 0.3, radius: 50 }).bindPopup('Your Current Location').addTo(map).openPopup();
                        }
                        if (x >= 1) {

                            L.circle([test[x].lat, test[x].lng], { draggable: false, color: 'red', fillColor: '#f03', fillOpacity: 0.3, radius: 50 }).bindPopup("<img src=" + result[x - 1].img + " style='width:200px; height:100px;'><h2 id ='namesss'>" + result[x - 1].name + "</h2>" + "<button id ='loc' onclick = 'saveMonument(\"" + result[x - 1].idPOI + "\")'> More Info</button>", {autoClose: false, closeOnClick: false}).addTo(map);

                        }
                    } 
                    
                },
                
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            })
        })
    }

    /*-----------------------add names to side table-------------------------*/

    $.ajax({
        url: '/api/POI/location',
        method: 'get',
        success: function (result, status) {
            var newLocs = [];

            console.log(latUser + " " + longUser);
            str = ''
            locs = document.getElementById("locs")
            for (x in result) {
                newLocs.push([result[x].idPOI, result[x].name, getDistance(latUser, longUser, result[x].latitude, result[x].longitude)])
            }

            newLocs.sort(function (a, b) {
                return a[2] - b[2];
            });

            arrayTitle = newLocs.map(function (x) {
                return x[0];
            });
            arrayTitle2 = newLocs.map(function (x) {
                return x[1];
            }); arrayTitle3 = newLocs.map(function (x) {
                return x[2];
            });
            for (x in newLocs) {
                str += '<tr><td style="color:darkred; cursor:pointer"><a style="color:black; cursor:pointer" onclick="saveMonument(\'' + arrayTitle[x] + '\')">' + arrayTitle2[x] + '</a> - ' + arrayTitle3[x] + ' Km</td></tr>'
                console.log(result[x].idPOI)
            }

            locs.innerHTML = str
            console.log(locations)
        },
        error: function () {
            console.log('Error');
        }
    })
}
/*-----------------------------------save Monument  ID for next page--------------------------------------*/
function saveMonument(idPOI) {
    console.log(idPOI)
    localStorage.setItem("idPOI", idPOI)
    console.log(localStorage.getItem("idPOI"))
    window.location.href = "info.html"

}

/*---------------------------------- get monument ID by name --------------------------------------------*/
function procurar() {
    nome = document.getElementById("myInput").value
    $.ajax({
        url: '/api/POI/location',
        method: 'get',
        success: function (result, status) {
            for (x in result) {
                if (nome == result[x].name) {
                    saveMonument(result[x].idPOI)
                }
            }

        },
        error: function () {
            console.log('Error');
        }
    })

}


/*------------------------ calculate distance in KM----------------------------*/

function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    var final = Math.round(d * 100) / 100
    console.log(final);
    return final;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

/*-----------------------add names to side table pt.2-------------------------*/

function toggle() {
    var x = document.getElementById("tog");
    if (document.getElementById("tog").innerHTML === "Closest To You") {
        $.ajax({
            url: '/api/POI/AvgRating',
            method: 'get',
            success: function (result, status) {
                locs = document.getElementById("locs")
                str = ''
                for (x in result) {
                    str += '<tr><td style="color: darkgoldenrod; cursor:pointer"><a style="color:black; cursor:pointer" onclick="saveMonument(\'' + result[x].POI_idPOI + '\')">' + result[x].name + '</a> - ' + Math.round(result[x].media * 100) / 100 + '⭐</td></tr>'
                }
                locs.innerHTML = str
                console.log(result)
            },
            error: function () {
                console.log('Error');
            }
        })
        document.getElementById("tog").innerHTML = "Top Rated";
    } else {
        x.innerHTML = "Closest To You";
        $.ajax({
            url: '/api/POI/location',
            method: 'get',
            success: function (result, status) {
                var newLocs = [];

                console.log(latUser + " " + longUser);
                str = ''
                locs = document.getElementById("locs")
                for (x in result) {
                    newLocs.push([result[x].idPOI, result[x].name, getDistance(latUser, longUser, result[x].latitude, result[x].longitude)])
                }

                newLocs.sort(function (a, b) {
                    return a[2] - b[2];
                });

                arrayTitle = newLocs.map(function (x) {
                    return x[0];
                });
                arrayTitle2 = newLocs.map(function (x) {
                    return x[1];
                }); arrayTitle3 = newLocs.map(function (x) {
                    return x[2];
                });
                for (x in newLocs) {
                    str += '<tr><td style="color:darkred; cursor:pointer"><a style="color:black; cursor:pointer" onclick="saveMonument(\'' + arrayTitle[x] + '\')">' + arrayTitle2[x] + '</a> - ' + arrayTitle3[x] + ' Km</td></tr>'
                    console.log(result[x].idPOI)
                }

                locs.innerHTML = str
                console.log(locations)
            },
            error: function () {
                console.log('Error');
            }
        })
    }
    console.log(document.getElementById("tog"))
}