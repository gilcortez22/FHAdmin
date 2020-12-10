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

$(document).ready(function () {
    // console.log('Funciona');
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

    $('#search').keyup(function (e) {
        var filteredDataCli = [];

        let value = $('#search').val();
        for (var i = 0; i < cliDataUsr.length; i++) {
            value = value.toLowerCase();
            var name = cliDataUsr[i].cliente.toLowerCase()
            var cod = String(cliDataUsr[i].cod_cliente)
            if (name.includes(value) || cod.includes(value)) {
                filteredDataCli.push(cliDataUsr[i])
            }
        }
        tmp = 0;
        CliTable(filteredDataCli, variableTwo, search, tmp);
        //Cierra Ready
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
        //console.log(filteredDataPrd)
        tmp = 0;
        CargarPrd(filteredDataPrd, tmp);
        //Cierra Ready
    })




});

function loadClientes() {
    $.get("http://localhost:3000/ShowCli", function (response, status) {
        DataUsr = JSON.parse(JSON.stringify(response));

        for (var i = 0; i < DataUsr.length; i++) {
            if (DataUsr[i].plugestor == variableTwo) {
                cliDataUsr.push(DataUsr[i]);
            }
            cliDataUsr = JSON.parse(JSON.stringify(cliDataUsr));
        }
        tmp = 0;
    });
}

function loadProductos(cliPro) {

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/ShowPrd',
        crossDomain: true,
        data: { search: cliPro },
        dataType: 'json',
        success: function (response) {
            cliDataPrd = JSON.parse(JSON.stringify(response));

            CargarPrd(cliDataPrd, tmp2);
        },
        error: function (response) {
            console.log('POST failed.');
        }
    })
    tmp2 = 0;

};


$(document).on('click', '.btn', function () {
    let element = $(this)[0].parentElement.parentElement.parentElement.parentElement;
    id = $(element).attr('codTienda');
    tmp = 1;
    CliTable(cliDataUsr, id, tmp);

    loadProductos(id);

    ;
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
};


function CliTable(usrs, search, tmp) {
    template = '';
    itmCount = 0;
    for (var i = 0; i < usrs.length; i++) {
        if (tmp == 0) {
            template += `<tr codTienda="${usrs[i].cod_cliente}">
        <td>${usrs[i].cod_cliente}</td> 
        <td>${usrs[i].cliente}</a></td>
        <td>${usrs[i].nombrecomercial}</a></td>
        <td>${usrs[i].ultima_vta.split('T')[0]}</a></td>
        <td>
        <div class = "row">
        <div class = "col"><button class="btn btn-sm btn-success btn-block" type="button" id="ver">Ver</button></div>
        <div class = "col"><button class="btnn btn-sm btn-danger btn-block" type="button" disabled onclick="myFunctionb()" id="regresar">Regresar</button></div>
        </div>
        </td>
        </tr>`;

            document.getElementById("search").disabled = false;
            itmCount = itmCount + 1;
            if (i === 5) { break; }
        } else {
            if (parseInt(usrs[i].cod_cliente) == parseInt(search)) {

                template += `<tr codTienda="${usrs[i].cod_cliente}">
                <td>${usrs[i].cod_cliente}</td> 
                <td>${usrs[i].cliente}</a></td>
                <td>${usrs[i].nombrecomercial}</a></td>
                <td>${usrs[i].ultima_vta.split('T')[0]}</a></td>
                <td>
                <div class = "row">
                <div class = "col"><button class="btn btn-sm btn-success btn-block" type="button" id="ver" disabled>Ver</button></div>
                <div class = "col"><button class="btnn btn-sm btn-danger btn-block" type="button" onclick="myFunctionb()" id="regresar">Regresar</button></div>
                </div>
                </td>
                </tr>`;

                document.getElementById("search").disabled = true;
                itmCount = itmCount + 1;
                if (i === 5) { break; }
            }

        };
    };

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

    /*
        
            prds.forEach(prds => {
                if (parseInt(prds["cod_cliente"]) == parseInt(CodCliente)) {

               

                };
            });

        }else {
            Productos.forEach(Productos => {

                template2 += ` <tr codProducto="${Productos["nobasico"]}">
                <td>${Productos["fabricante"]}</td> 
                <td>${Productos["nobasico"]}</td> 
                <td>${Productos["descripcion"]}</td> 
                <td>${Productos["actual"]}</a></td>
                <td>${Productos["reciente"]}</a></td>
                <td>${Productos["existencia"]}</a></td>
                </tr>`;

            });

        }  
*/
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




