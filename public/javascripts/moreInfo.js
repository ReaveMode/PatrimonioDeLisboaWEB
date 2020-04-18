window.onload = function () {
    console.log("boas manos");
    $.ajax({
        url: '/api/POI/location',
        method: 'get',
        success: function (result, status) {
            str = ''
            locName = document.getElementById("locName");
            console.log(localStorage.getItem('name'));
            for (x in result) {
                if (result[x].name == localStorage.getItem('name'))
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
            console.log(localStorage.getItem('name'));
            for (x in result) {
                if (result[x].name == localStorage.getItem('name'))
                    str = '<p>' + result[x].description + '</p>'
            }
            locText.innerHTML = str
        },
        error: function () {
            console.log('Error');
        }
    })
}




/* '<p>' + result[x].description + '</p>' */