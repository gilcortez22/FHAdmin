var vOneLS = localStorage.getItem("vOneLocalStorage"); 
        var variableTwo = vOneLS;  
        let template = '';   
        let search ="";
        let DataUsr;
        var tmp =0;    
$(document).ready(function() {
        console.log('Funciona');
        //Lee NODE
        $.get("http://localhost:3000/ShowCli", function(response,status){
            let DataUsr =JSON.parse(JSON.stringify(response));
            
            //Llama Funcion para llenar tabla
            tmp =0;    
            CliTable(DataUsr,variableTwo,search,tmp);

        
  //  $('#container').html(template)
        });

//search
        $('#search').bind('keydown', function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        });
        
            $('#search').keyup(function(e) {
                let DataUsr =[];
                var filteredData = [];
                   $.get("http://localhost:3000/ShowCli", function(response,status){
             DataUsr =JSON.parse(JSON.stringify(response));
             var value = $('#search').val();
             
             for (var i =0; i < DataUsr.length; i++)
             {
                 value = value.toLowerCase();
                 var name = DataUsr[i].cliente.toLowerCase()
                
                 if(name.includes(value))
                 {
             
                     filteredData.push(DataUsr[i])
                 }
                 filteredData = JSON.parse(JSON.stringify(filteredData));
             }
             console.log('DATA',filteredData);
             
             tmp =0;
             CliTable(filteredData,variableTwo,search,tmp);
            });
             
            })            
        
        
});

  //Funcion para llenar tabla
  function CliTable(usrs,gestor,cliente,tmp) {
    template = '';   
    usrs.forEach(usrs => {
       if (usrs["plugestor"] == gestor){
             if (tmp == 0) {
        template += ` <tr codTienda="${usrs["cod_cliente"]}">
        <td>${usrs["cod_cliente"]}</td> 
        <td>${usrs["cliente"]}</a></td>
        <td>
        <div class = "row">
        <div class = "col"><button class="btn btn-sm btn-success btn-block" type="button">Ver</button></div>
        <div class = "col"><button class="btnn btn-sm btn-danger btn-block" type="button" onclick="myFunctionb()">Regresar</button></div>
        </div>
        </td>
        </tr>;`
       } else {
        if (usrs["cod_cliente"] == cliente){
            template += ` <tr codTienda="${usrs["cod_cliente"]}">
        <td>${usrs["cod_cliente"]}</td> 
        <td>${usrs["cliente"]}</a></td>
        <td>
        <div class = "row">
        <div class = "col"><button class="btn btn-sm btn-success btn-block" type="button">Ver</button></div>
        <div class = "col"><button class="btnn btn-sm btn-danger btn-block" type="button" onclick="myFunctionb()">Regresar</button></div>
        </div>
        </td>
        </tr>;`
       }
       }
    }
    });
    $('#container').html(template);
}

//onclick="myFunctiona()"

function CargarPrd(){
    $.get("http://localhost:3000/ShowPrd", function(response,status){
        let prds =JSON.parse(JSON.stringify(response));
        console.log(prds);
    });
}


$(document).on('click', '.btn', function() {
    let element = $(this)[0].parentElement.parentElement.parentElement.parentElement;
    let id = $(element).attr('codTienda');
    $.get("http://localhost:3000/ShowCli", function(response,status){
        let DataUsr =JSON.parse(JSON.stringify(response));
        tmp =1;
        CliTable(DataUsr,variableTwo,id,tmp);
    $('#container').html(template);
    });
    CargarPrd();
});

function myFunctionb(){
    $.get("http://localhost:3000/ShowCli", function(response,status){
    let DataUsr =JSON.parse(JSON.stringify(response));
    tmp =0;
    id='';
    CliTable(DataUsr,variableTwo,id,tmp);

});

}





