
var URI = "http://localhost:3000/";
//var URI = "http://192.168.0.250:3000/";


$(document).ready(function () {
    loadDataClientes();
});


function loadDataClientes() {
    let cliDataCntct =[];
    console.log("Funciona");
    //var CodCliente = window.opener.thisIsAnObject;
    var CodCliente = location.search.substring(1);
    CodCliente = CodCliente.split('=')[1];
    console.log("json inicial",CodCliente)
    $.get(URI + 'GetCli', function (response, status) {
        let DataContacto = JSON.parse(JSON.stringify(response));
        console.log("Conecta");


        for (var i = 0; i < DataContacto.length; i++) {
          //  console.log(DataContacto[i].codigo ,parseInt(CodCliente))
            if (DataContacto[i].codigo == parseInt(CodCliente)) {
                cliDataCntct.push(DataContacto[i]);
                //console.log(DataContacto, "data");
            };

        };
        console.log("json final",cliDataCntct);
      });
};
