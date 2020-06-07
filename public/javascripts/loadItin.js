var id = localStorage.getItem("idPOI");

window.onload = function(){
    $.ajax({
        url: '/api/POI/itinerary/' + id,
        method: 'get',
        success: function (result, status) {
            console.log(id)
            str = '';
            var itinerary = document.getElementById("paixao");
            for (x in result) {
                    str += '<tr><td id = "imgTabela"><img src=' + result[x].img + '></td><td id = "descTabela">' +result[x].description + '</td></tr>'
            }
            itinerary.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })
}