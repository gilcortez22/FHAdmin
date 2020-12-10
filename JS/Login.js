$(document).ready(function() {

    $("button").click(function(){
        console.log('Funciona');
        var x = document.getElementById("input").value;
        var y = document.getElementById("inputPassword").value;            
        
        
        $.get("http://localhost:3000/Login", function(response,status){
            let usrs =JSON.parse(JSON.stringify(response));
            var entrar =0;
            for (var i =0; i < usrs.length; i++)
           // console.log(usrs[i].Nombre, usrs[i].Clave);
            
            {
                if (x == usrs[i].Nombre && y == usrs[i].Clave)
                {
                entrar =1;
                localStorage.setItem("vOneLocalStorage", usrs[i].PLUGestor); 

                }    
     
            };
            if (entrar == 1 )
            {
            window.location.href = "home.php";

            }else{
                alert("Credenciales Incorrectas");
            }

        });

    });
  
});



