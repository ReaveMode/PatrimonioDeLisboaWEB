var idUser;


window.onload = function () {
    /*-----------------------------------load POI name by Id--------------------------------------*/
    console.log("boas manos");
    $.ajax({
        url: '/api/POI/location',
        method: 'get',
        success: function (result, status) {
            str = ''
            locName = document.getElementById("Name");
            console.log(localStorage.getItem("idPOI"));
            for (x in result) {
                if (result[x].idPOI == localStorage.getItem("idPOI"))
                    str = '<h1>' + result[x].name + '</h1>'
            }
            locName.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })
    /*-----------------------------------load POI description by ID--------------------------------------*/
    $.ajax({
        url: '/api/POI/location',
        method: 'get',
        success: function (result, status) {
            str = ''
            locText = document.getElementById("Text");
            console.log(localStorage.getItem("idPOI"));
            for (x in result) {
                if (result[x].idPOI == localStorage.getItem("idPOI"))
                    str = '<p>' + result[x].description + '</p>'
            }
            locText.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })
    /*-----------------------------------load POI images by ID--------------------------------------*/
    $.ajax({
        url: '/api/POI/img',
        method: 'get',
        success: function (result, status) {
            str = ''
            ImgCard = document.getElementById("imgPlace");
            console.log(localStorage.getItem("idPOI"));
            for (x in result) {
                if (result[x].POI_idPOI == localStorage.getItem("idPOI")) {
                    str += '<img src ="' + result[x].url + '" id ="cards">'
                }
            }
            ImgCard.innerHTML += str
        },
        error: function () {
            console.log('Error');
        }
    })
    
    
    
    /*-----------------------------------load POI comments by ID--------------------------------------*/
    var id = localStorage.getItem("idPOI");
    $.ajax({
        url: '/api/POI/comms/' + id,
        method: 'get',
        success: function (result, status) {
            
            CommCard = document.getElementById("Comm");
            var first = result;
                    $.ajax({
                        url: '/api/POI/ratings/' + id,
                        method: 'get',
                        success: function (result, status) {
                            str = ''
                            var second = result;
                            console.log(first);
                            console.log(second);
                            for (x in second) {
                                     str += '<h2>'+ second[x].name +" - "+ second[x].rating +'</h2>' + '<p>' + first[x].comment + '</p></br>'
                            }   
                            CommCard.innerHTML += str
                        },
                        error: function () {
                            console.log('Error');
                        }
                    })   
        },
        error: function () {
            console.log('Error');
        }
    })

/*-----------------------------get User-------------------------*/

$.ajax({
    url: '/api/users/' + sessionStorage.getItem("username"),
    method: 'get',
    success: function (result, status) {
        idUser = result[0].idUser;
        console.log(idUser)
    },
    error: function () {
        console.log('Error');
    }
})



}

/*---------------------------------------Comment----------------------------------*/

function comentario(){
    console.log("alors on dance")
    $.ajax({
        url: 'api/POI/comentario',
        method: 'post',
        data:{
            comment:document.getElementById("comentario").value,
            idPOI:localStorage.getItem("idPOI"),
            idUser: idUser,
        },
        success: function(result,status){
           rating();
        },
        error: function(jqXHR,textStatus,errorThrown ){
            alert('Oops.... O seu comentário não foi publicado! :(')
            console.log(errorThrown);
        }
    })
}

function rating(){
    $.ajax({
        url: 'api/POI/rating',
        method: 'post',
        data:{
            rating:document.getElementById("rating").value,
            idPOI:localStorage.getItem("idPOI"),
            idUser: idUser,
        },
        success: function(result,status){
            alert('Obrigado pelo comentário e rating!')
            window.location = "info.html"
        },
        error: function(jqXHR,textStatus,errorThrown ){
            alert('Oops.... O seu comentário não foi publicado! :(')
            console.log(errorThrown);
        }
    })
}
