var vOneLS = localStorage.getItem("vOneLocalStorage");
var variableTwo = parseInt(vOneLS);
let template = '';
let template2 = '';
let search = "";
let DataUsr = [];
let DataPrd = [];
var tmp = 0;
var tmp2 = 0;
let id;
var cliDataUsr = [];
var cliDataPrd = [];
var itmCount = 0;
var URI = "http://localhost:3000/";
let selectedW = "";
let selectedD = "";
var week = selectedW.toUpperCase();
var day = selectedD.toUpperCase();
var filteredDataCli = [];
//var URI = "http://192.168.0.250:3000/";
var esSupr = 0;
let value = "";
var tmpV = 0;
var visitado = "Si";

function validarURL() {
    URI = "";
}

$(document).ready(function () {
    showDdl();
    //mutear enter key
    $('#search').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    $('#search2').bind('keydown', function (e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    loadClientes();

    hidesearch();

    $('#ddlDia').on('change', function () {
        //$('#ddlDia').change(function(){
        selectedD = $(this).find('option:selected').text();
        if (selectedD == 'Todo') {
            selectedD = '';
        }
        recorrerJSON(cliDataUsr);
    });

    $('#ddlSemana').on('change', function () {
        //$('#ddlDia').change(function(){

        selectedW = $(this).find('option:selected').text();
        if (selectedW == 'Todo') {
            selectedW = '';
        }
        recorrerJSON(cliDataUsr);
    });


    $('#search').keyup(function (e) {
        value = $('#search').val();
        value = value.toLowerCase();
        recorrerJSON(cliDataUsr);
    })

    $('#search2').keyup(function (e) {
        var filteredDataPrd = [];

        let value = $('#search2').val();
        for (var i = 0; i < cliDataPrd.length; i++) {
            value = value.toLowerCase();
            var name = cliDataPrd[i].nobasico.toLowerCase()
            var des = cliDataPrd[i].descripcion.toLowerCase()
            var fab = cliDataPrd[i].fabricante.toLowerCase()

            if (name.includes(value) || des.includes(value) || fab.includes(value)) {
                filteredDataPrd.push(cliDataPrd[i])
            }
        }
        tmp = 0;
        CargarPrd(filteredDataPrd, tmp);
        //Cierra Ready
    })

    $(document).on('click', '#visitado', function () {

        if (tmpV % 2 == 0) {
            visitado = 'SiNo'
            tmpV += 1;

        } else {
            visitado = 'Si'

            tmpV += 1;

        }
        recorrerJSON(cliDataUsr);

    });

    $("#ddlDia").find("option").filter(function () {
        return this.innerHTML == selectedD;

    }).attr("selected", true);


    $("#ddlSemana").find("option").filter(function () {
        return this.innerHTML == selectedW;

    }).attr("selected", true);
    // Fin Ready
});

function loadClientes() {

    evaluarSuper();
    $.get(URI + 'ShowCli', function (response, status) {

        DataUsr = JSON.parse(JSON.stringify(response));


        for (var i = 0; i < DataUsr.length; i++) {

            if (esSupr == 1) {
                if (DataUsr[i].plug_cc == variableTwo) {
                    cliDataUsr.push(DataUsr[i]);
                }
            } else {

                if (DataUsr[i].plugestor == variableTwo) {
                    cliDataUsr.push(DataUsr[i]);

                }
            }
            cliDataUsr = JSON.parse(JSON.stringify(cliDataUsr));

        }
        tmp = 0;
        recorrerJSON(cliDataUsr);
    });
}



$(document).on('click', '#gestionar', function () {
    let thisIsAnObject;
    let element = $(this)[0].parentElement.parentElement.parentElement.parentElement;
    id = $(element).attr('codTienda');
    var w = window.open("gestion.php?var=" + id + "/" + variableTwo, "Gestion Cliente", "width=900,height=500");
    w.codClienteW = thisIsAnObject;

});

function loadProductos(cliPro) {

    $.ajax({
        type: 'POST',
        url: URI + 'ShowPrd',
        crossDomain: true,
        data: { search: cliPro },
        dataType: 'json',
        success: function (response) {
            cliDataPrd = JSON.parse(JSON.stringify(response));

            CargarPrd(cliDataPrd, tmp2);
        },
        error: function (response) {
        }
    })
    tmp2 = 0;

};

$(document).on('click', '#ver', function () {
    let element = $(this)[0].parentElement.parentElement.parentElement.parentElement;
    id = $(element).attr('codTienda');
    tmp = 1;
    CliTable(cliDataUsr, id, tmp);

    loadProductos(id);
    //       $('#container2').html(template2);
    hidesearch();
});


function hidesearch() {
    var x = document.getElementById("search2");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    };
    var y = document.getElementById("lupsearch2");
    if (y.style.display === "none") {
        y.style.display = "block";
    } else {
        y.style.display = "none";
    };
};

function dibujarTblCli(usrs, i,ver,regresar) {
    template += `<tr codTienda="${usrs[i].cod_cliente}">`
    if (esSupr == 1) {
        template += `<td>${usrs[i].gestor}</td>`;
    }
    if (usrs[i].visitado == 'Si') {
        template += `<td>${usrs[i].cod_cliente}&nbsp;<i class="fas fa-home" style="color:green;"></i></td> `
    } else {
        template += `<td>${usrs[i].cod_cliente}&nbsp;<i class="fas fa-home"></i></td> `
    }
    template += `<td>${usrs[i].cliente}</td>
    <td>${usrs[i].nombrecomercial}</td>
    <td>${usrs[i].ultima_vta.split('T')[0]}</td>
    <td>
        <div class = "row">
        <div class = "col"><button class="btn btn-sm btn-success btn-block" type="button" id="ver" ${regresar}>Productos</button></div>
        <div class = "col"><button class="btn btn-sm btn-danger btn-block" type="button" onclick="myFunctionb()" id="regresar" ${ver}>Regresar</button></div>`;
    if (esSupr == 1) {
        template += `<div class = "col"><button class="btn btn-sm btn-warning btn-block" type="button" id="gestionar">Gestionar</button></div>`;
    }
    template +=
        `</div>
                        </td>
                        </tr>`;
    itmCount = itmCount + 1;
}

function CliTable(usrs, search, tmp) {
    template = '';
    dibujaheader();
    itmCount = 0;
    for (var i = 0; i < usrs.length; i++) {
        if (tmp == 0) {
            document.getElementById("search").disabled = false;
            dibujarTblCli(usrs, i,'disabled','')
        } else {
            if (parseInt(usrs[i].cod_cliente) == parseInt(search)) {
                dibujarTblCli(usrs, i,'', 'disabled')
            }
            document.getElementById("search").disabled = true;
        };
    };
    template += `</table>`
    $('#container').html(template);
};


function CargarPrd(PrdsCliente, tmp) {
    template2 = '';
    template2 = `
    <table id="Productos" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <thead>
        <tr>
            <th class="th-sm" scope="col">Fabricante
            </th>
            <th class="th-sm" scope="col">NoBasico
            </th>
            <th class="th-sm" scope="col">Descripcion
            </th>
            <th class="th-sm" scope="col">Ultima Venta
            </th>
            <th class="th-sm" scope="col">Venta 2019
            </th>
            <th class="th-sm" scope="col">Venta 2020
            </th>
            <th class="th-sm" scope="col">Venta 30 días
            </th>
            <th class="th-sm" scope="col">Existencia
            </th>
        </tr>
    </thead> `;

    for (var i = 0; i < PrdsCliente.length; i++) {
        if (tmp2 == 0) {
            template2 += ` <tr codProducto="${PrdsCliente[i].nobasico}">
            <td>${PrdsCliente[i].fabricante}</td> 
            <td>${PrdsCliente[i].nobasico}</td> 
            <td>${PrdsCliente[i].descripcion}</td> 
            <td>${PrdsCliente[i].ult_vta.split('T')[0]}</a></td>
            <td>${PrdsCliente[i].vta19}</a></td>
            <td>${PrdsCliente[i].vta20}</a></td>
            <td>${PrdsCliente[i].vta_30d}</a></td>
            <td>${PrdsCliente[i].existencia}</a></td>
            </tr>`;

        }

        if (i === 50) { break; }
        itmCount = itmCount + 1;
    };


    template2 += `</table>`;
    $('#container2').html(template2);

};



function myFunctionb() {
    tmp = 0;
    CliTable(cliDataUsr, variableTwo, tmp);
    $('#container').html(template);
    $('#container2').html("");
    document.getElementById("search2").value = "";
    
    hidesearch();
};



function evaluarSuper() {
    if (variableTwo == 690 || variableTwo == 691 || variableTwo == 695) {

        esSupr = 1;
    } else {

        esSupr = 0;
    };


}
function dibujaheader() {
    if (esSupr == 1) {
        template += `
    <table id="Clientes" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <thead>
    <tr>
    
    <th class="th-sm text-center" style="width: 9%" scope="col">Gestor
        </th>
      <th class="th-sm text-center" style="width: 3.5%" scope="col">Id Cliente
      </th>
      <th class="th-sm text-center" style="width: 20%" scope="col">Cliente
      </th>
      <th class="th-sm text-center" style="width: 20%" scope="col">Nombre Comercial
      </th>
      <th class="th-sm text-center" style="width: 5%" scope="col">Última Venta
      </th>
      <th class="th-sm text-center" style="width: 25%" scope="col" >Función
      </th>
    </tr>
  </thead>`;
    } else {
        template += `
    <table id="Clientes" class="table table-striped table-bordered" cellspacing="0" width="100%">
    <thead>
    <tr>
    <th class="th-sm text-center" style="width: 5%" scope="col">Id Cliente
    </th>
    <th class="th-sm text-center" style="width: 25%" scope="col">Cliente
    </th>
    <th class="th-sm text-center" style="width: 25%" scope="col">Nombre Comercial
    </th>
    <th class="th-sm text-center" style="width: 10%" scope="col">Última Venta
    </th>
    <th class="th-sm text-center" style="width: 20%" scope="col" >Función
    </th>
    </tr>
  </thead>`;
    }
}

function getSemana() {
    if (moment().week() % 2 == 1) {
        selectedW = "Semana " + (((moment().week() % 2 == 1) - 2) * -1)
    }
    else {
        selectedW = "Semana " + (((moment().week() % 2 == 1) - 2) * -1)
    }
    return selectedW;
}

function getDia() {
    var d = new Date();
    var weekday = new Array(5);
    weekday[1] = "Lunes";
    weekday[2] = "Martes";
    weekday[3] = "Miercoles";
    weekday[4] = "Jueves";
    weekday[5] = "Viernes";
    weekday[0] = "";
    weekday[6] = "";
    weekday[7] = "";


    return selectedD = weekday[d.getDay()];
};


function showDdl() {
    var dia = getDia();
    var semana = getSemana();
    templateDdl = `
    <select class="browser-default custom-select" id ="ddlSemana">
    <option selected="">Todo</option>
    <option value="1">Semana 1</option>
    <option value="2">Semana 2</option>
    <option value="3">Reactivar</option>
  </select>
<select class="browser-default custom-select" id ="ddlDia">
    <option selected="">Todo</option>
    <option value="1">Lunes</option>
    <option value="2">Martes</option>
    <option value="3">Miercoles</option>
    <option value="4">Jueves</option>
    <option value="5">Viernes</option>
  </select>`;

    $('#ddl').html(templateDdl);

}



function recorrerJSON(cliDataUsr) {
    filteredDataCli = [];
    week = selectedW.toUpperCase();
    day = selectedD.toUpperCase();
    for (var i = 0; i < cliDataUsr.length; i++) {
        var name = cliDataUsr[i].cliente.toLowerCase()
        var cod = String(cliDataUsr[i].cod_cliente)
        var ges = String(cliDataUsr[i].gestor).toLowerCase()
        var comercial = String(cliDataUsr[i].nombrecomercial).toLowerCase()
        var qWeek = cliDataUsr[i].semana
        var qDay = cliDataUsr[i].dia
        if (visitado.includes(cliDataUsr[i].visitado)) {
            // console.log(visitado, cliDataUsr[i].visitado)
            if (qWeek.includes(week)) {

                if (qDay.includes(day)) {
                    if (esSupr == 1) {

                        if (name.includes(value) || cod.includes(value) || ges.includes(value) || comercial.includes(value)) {
                            filteredDataCli.push(cliDataUsr[i])
                        }
                    } else {
                        if (name.includes(value) || cod.includes(value) || comercial.includes(value)) {
                            filteredDataCli.push(cliDataUsr[i])
                        }
                    }
                }
            }
        }
    }
    tmp = 0;
    CliTable(filteredDataCli, variableTwo, search, tmp);
}

