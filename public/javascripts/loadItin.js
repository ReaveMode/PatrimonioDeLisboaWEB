var id = localStorage.getItem("idPOI");
var idUser;

window.onload = function () {
     $.ajax({
        url: '/api/users/' + sessionStorage.getItem("username"),
        method: 'get',
        success: function (result, status) {
            idUser = result[0].idUser;
            getItin(idUser);
            console.log(idUser)
        },
        error: function () {
            console.log('Error');
        }
    })
   
   



}


function remove(Poi) {
    $.ajax({
        url: 'api/POI/delete/',
        method: 'post',
        data: {
            idUser: idUser,
            idPOI: Poi,
        },
        success: function (result, status) {
            console.log(sessionStorage.getItem("username"))
            alert('Apagou do Itinerário')
            window.location = "itinerary.html";
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("Oops... Houve um problema!")
            console.log(errorThrown);
        }
    })

}


function directions(idPOI) {
    console.log(idPOI)
    localStorage.setItem("idPOI", idPOI)
    console.log(localStorage.getItem("idPOI"))
    window.location.href = "directions.html"

}

function getItin(idUser){
    $.ajax({
        url: '/api/POI/itinerary/' + idUser,
        method: 'get',
        success: function (result, status) {
            console.log(idUser)
            str = '';
            var itinerary = document.getElementById("paixao");
            for (x in result) {
                
                str += '<tr><td id = "imgTabela"><img src=' + result[x].img + '></td><td id = "descTabela">' + result[x].description + '<button onclick="remove(\'' + result[x].POI_idPOI + '\')"> Remove</button>  <button onclick="directions(\'' + result[x].POI_idPOI + '\')"> Directions</button></td></tr>'
            }
            itinerary.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })
}