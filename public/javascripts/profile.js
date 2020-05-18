var idUser;

window.onload = function(){
    $.ajax({
        url: '/api/users/' + sessionStorage.getItem("username"),
        method: 'get',
        success: function (result, status) {
            var session = sessionStorage.getItem("username");
            $("#name").val(result[0].name)
            $("#email").val(session)
            $("#country").val(result[0].country)
            idUser = result[0].idUser
        },
        error: function () {
            console.log('Error');
        }
    })
}

function changeInfo(){
    $.ajax({
        url: '/api/users/updateProfile',
        method: 'put',
        data:{
            email:document.getElementById("email").value,
            country:document.getElementById("country").value,
            idUser:idUser,
        },
        success: function (result, status) {
            var session = sessionStorage.getItem("username");
            console.log("yay, you did it")
            alert("Trocou as suas informações pessoais! Por favor volte a dar Login!")
            window.location = "login.html"
            
        },
        error: function () {
            console.log('Error');
        }
    })
}