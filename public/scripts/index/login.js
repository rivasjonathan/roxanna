var nombre = document.getElementById("name")
var contrasena = document.getElementById("password")
var token = document.getElementById("token")

document.getElementById("form").addEventListener("submit", (e) =>{
    e.preventDefault();

    $.ajax({
        url: "/login",
        method: "POST",
        data:{
            name: nombre.value,
            password: contrasena.value,
            token: token.value
        },
        success: function(response){
            if(response == 0){

                nombre.classList.add("is-invalid")
                contrasena.classList.add("is-invalid")
            
            }else{
                nombre.classList.add("is-valid")
                contrasena.classList.add("is-valid")

                window.location.href = "/victims";
            }
        }
    })
})