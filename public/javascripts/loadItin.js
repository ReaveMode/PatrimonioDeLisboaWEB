var id = localStorage.getItem("idPOI");

window.onload = function(){
    $.ajax({
        url: '/api/POI/itinerary/' + id,
        method: 'get',
        success: function (result, status) {
            console.log(id)
            str = '';
            var itinerary = document.getElementById("itin");
            for (x in result) {
                    str += '<div class = "itinItems"><img src=' + result[x].img + 'style="list-style-type: none;"><p>' +result[x].description + '</p></div>'
            }
            itinerary.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })
}