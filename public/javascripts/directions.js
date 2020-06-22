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
    console.log(localStorage.getItem("idPOI"))
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
                        if(localStorage.getItem("idPOI") == result[x].idPOI)
                            test.push(L.latLng(result[x].latitude, result[x].longitude), result[x].idPOI, result[x].img, result[x].name)

                    }
                    console.log(test[2]);
                    
                    for (x in test) {
                        console.log(x);
                        if (x == 0) {
                            L.circle([test[x].lat, test[x].lng], { draggable: false, color: 'Blue', fillColor: '#00008B', fillOpacity: 0.3, radius: 50 }).bindPopup('Your Current Location').addTo(map).openPopup();
                        }
                        if(x >=1) {

                            L.circle([test[x].lat, test[x].lng], { draggable: false, color: 'red', fillColor: '#f03', fillOpacity: 0.3, radius: 50 }).bindPopup("<img src=" + test[3] + " style='width:200px; height:100px;'><h2 id ='namesss'>" + test[4] + "</h2>", {autoClose: false, closeOnClick: false}).addTo(map);

                        }
                    } 
                    
                },
                
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(errorThrown);
                }
            })
        })
    }
}
