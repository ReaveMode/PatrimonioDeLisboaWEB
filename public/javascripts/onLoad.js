var marker = {};
var control;
var been_routed = true;
var test = [];
var name;

window.onload = function () {
    console.log(sessionStorage.getItem("username"))
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
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
                    var waypoints = test;
                    control = L.Routing.control({
                        plan: L.Routing.plan(test, {
                            createMarker: function (x, test, nWps) {
                                if (x == 0) {
                                    return L.circle(test.latLng, { draggable: false, color: 'Blue', fillColor: '#00008B', fillOpacity: 0.3, radius: 50 }).bindPopup('Your Current Location').openPopup();
                                }
                                if (x >= 1) {

                                    return L.circle(test.latLng, { draggable: false, color: 'red', fillColor: '#f03', fillOpacity: 0.3, radius: 50 }).bindPopup("<p id ='namesss'>" + result[x - 1].name + "</p>" + "<p id ='loc' onclick = 'saveMonument(\"" + result[x - 1].idPOI + "\")'> More Info</p>").openPopup();

                                }
                            }
                        })

                    }).addTo(map);
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
            str = ''
            locs = document.getElementById("locs")
            for (x in result) {
                str += '<tr><td>' + result[x].name + '</td></tr>'
            }
            locs.innerHTML = str + locs.innerHTML
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