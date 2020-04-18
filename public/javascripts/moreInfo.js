window.onload = function () {
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
                    str = '<p>' + result[x].name + '</p>'
            }
            locName.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })
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
    $.ajax({
        url: '/api/POI/img',
        method: 'get',
        success: function (result, status) {
            str = ''
            card = document.getElementById("imgPlace");
            console.log(localStorage.getItem("idPOI"));
            for (x in result) {
                if (result[x].POI_idPOI == localStorage.getItem("idPOI")){
                    str += '<img src ="' + result[x].url + '" id ="cards">'
                }
            }
            card.innerHTML += str 
        },
        error: function () {
            console.log('Error');
        }
    })
}
