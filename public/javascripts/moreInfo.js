window.onload = function () {
    /*-----------------------------------load POI name by Id--------------------------------------*/
    console.log("boas manos");
    $.ajax({
        url: '/api/POI/location',
        method: 'get',
        success: function (result, status) {
            str = ''
            locName = document.getElementById("locName");
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
            locText = document.getElementById("locText");
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
            card = document.getElementById("imgPlace");
            console.log(localStorage.getItem("idPOI"));
            for (x in result) {
                if (result[x].POI_idPOI == localStorage.getItem("idPOI")) {
                    str += '<img src ="' + result[x].url + '" id ="cards">'
                }
            }
            card.innerHTML += str
        },
        error: function () {
            console.log('Error');
        }
    })
    /*-----------------------------------load POI comments by ID--------------------------------------*/
    $.ajax({
        url: '/api/POI/comms',
        method: 'get',
        success: function (result, status) {
            str = ''
            card = document.getElementById("locComm");
            console.log(localStorage.getItem("idPOI"));
            for (x in result) {
                if (result[x].POI_idPOI == localStorage.getItem("idPOI")) {
                    str += '<p>' + result[x].comment + '</p>'
                    
                }
            }
            card.innerHTML += str
        },
        error: function () {
            console.log('Error');
        }
    })
    /*-----------------------------------load POI ratings by ID--------------------------------------*/
    $.ajax({
        url: '/api/POI/ratings',
        method: 'get',
        success: function (result, status) {
            str = ''
            card = document.getElementById("locComm");
            console.log(localStorage.getItem("idPOI"));
            for (x in result) {
                if (result[x].POI_idPOI == localStorage.getItem("idPOI")) {
                    str += '<h2>' + result[x].rating +'</h2>'
                }
            }   
            card.innerHTML += str
        },
        error: function () {
            console.log('Error');
        }
    })


}
