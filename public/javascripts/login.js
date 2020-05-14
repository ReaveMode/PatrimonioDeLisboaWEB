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