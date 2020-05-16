function entrar(){
    $.ajax({
        url: 'api/users/login',
        method: 'post',
        data:{
            email:document.getElementById("nome").value,
            password:document.getElementById("palavra").value,
        },
        success: function(result,status){
            alert('You sucessfuly logged in!')
            sessionStorage.setItem("username",document.getElementById("nome").value);
            window.location = "index.html";
        },
        error: function(jqXHR,textStatus,errorThrown ){
            Swal.fire({
                title: 'Oops...',
                text: 'Your Username or Password is incorrect!',
            })
            console.log(errorThrown);
        }
    })
}

function registar(){
    $.ajax({
        url: 'api/users/register',
        method: 'post',
        data:{
            name:document.getElementById("name").value,
            email:document.getElementById("email").value,
            password:document.getElementById("pass").value,
            country:document.getElementById("country").value,
            
        },
        success: function(result,status){
            alert('Registou com sucesso!')
            window.location = "login.html";
        },
        error: function(jqXHR,textStatus,errorThrown ){
            alert("Oops... Inseriu dados inválidos! :(")
            console.log(errorThrown);
        }
    })


}