
let updStr = "";
var CodCliente = location.search.substring(1);
CodCliente = CodCliente.split('=')[1];
CodCliente = CodCliente.split('/')[0];
var Codgestor = location.search.substring(1);
Codgestor = Codgestor.split('/')[1];
let DataTipi = [];
let DataCall = [];
let DataActualiza = [];
var URI = "http://localhost:3000/";

//var URI = "http://192.168.0.250:3000/";

$(document).ready(function () {
// console.log("hostname: ", self.location.host);
    /* $('#chkCobro').click(function () {
         if ($(this).is(':checked')) {
             $('#fecPago').attr('readonly', true)
                 .datepicker();
         } else {
             $('#fecPago').attr('readonly', false)
                 .datepicker("destroy");
         }
     });
 */
    //$("#InputFecPago").val('');
    $('#fecPago').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
    });

    var ddlTipi = document.getElementById('ddlTipi');
    var ddlSub = document.getElementById('ddlSub');
    var ddlDet = document.getElementById('ddlDet');

    $('#ddlTipi').on('change', function () {
        var selectedTipi = $(this).find('option:selected').text()

        loadSubs(selectedTipi);
    });

    $('#ddlSub').on('change', function () {
        var selectedSub = $(this).find('option:selected').text()

        loadDet(selectedSub);
    });


    getTipis();
    getVisita(CodCliente);
    loadDataClientes();
    loadLlamadas(CodCliente);
    loadActualizarDatos(CodCliente);

    $(document).on('click', '#registrar', function () {
        RegCall(CodCliente);
        updContacto(CodCliente);
        location.reload();
    });

});


function getTipis() {
    $.get(URI + 'GetTipi', function (response, status) {
        DataTipi = JSON.parse(JSON.stringify(response));
        loadTipis();
    });
}

function getVisita(codCliente) {
    $.get(URI + 'GetVisita', function (response, status) {

        DataVisita = JSON.parse(JSON.stringify(response));
        for (var i = 0; i < DataVisita.length; i++) {
            
            if (DataVisita[i].cod_cliente == codCliente) {
                console.log(DataVisita)
                    document.getElementById('lblFecVisita').innerHTML = DataVisita[i].fecha.split('T')[0];
                document.getElementById('lblNovedad').innerHTML = "Pendiente";
                document.getElementById("txtComent").value = DataVisita[i].newness;
            }
        }
    });
}

function loadTipis() {
    var lookup = {};
    var tipificaciones = [];
    for (var i = 0; i < DataTipi.length; i++) {
        var nomTipi = DataTipi[i].tipificaciones;
        if (!(nomTipi in lookup)) {
            lookup[nomTipi] = 1;
            tipificaciones.push(DataTipi[i]);
        }
    }
    for (var i = 0; i < tipificaciones.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ddlTipi.innerHTML = ddlTipi.innerHTML +
            '<option value="' + i + '">' + tipificaciones[i].tipificaciones + '</option>';
    }
}

function loadSubs(tipificacion) {
    $(ddlSub).empty();
    $(ddlDet).empty();
    ddlSub.innerHTML = ddlDet.innerHTML + '<option value="' + i + '">SubTipificacion</option>'
    ddlDet.innerHTML = ddlDet.innerHTML + '<option value="' + i + '">Detalle</option>'

    var lookup = {};
    var subTipificaciones = [];
    for (var i = 0; i < DataTipi.length; i++) {
        if (tipificacion == DataTipi[i].tipificaciones) {
            var nomSub = DataTipi[i].subtipificaciones;
            if (!(nomSub in lookup)) {
                lookup[nomSub] = 1;
                subTipificaciones.push(DataTipi[i]);
            }
        }
    }
    for (var i = 0; i < subTipificaciones.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ddlSub.innerHTML = ddlSub.innerHTML +
            '<option value="' + i + '">' + subTipificaciones[i].subtipificaciones + '</option>';
    }
}

function loadDet(subtipificacion) {
    $(ddlDet).empty();
    ddlDet.innerHTML = ddlDet.innerHTML + '<option value="' + i + '">Detalle</option>'
    var lookup = {};
    var detalle = [];
    for (var i = 0; i < DataTipi.length; i++) {
        if (subtipificacion == DataTipi[i].subtipificaciones) {
            var nomDet = DataTipi[i].detalle;
            if (!(nomDet in lookup)) {
                lookup[nomDet] = 1;
                detalle.push(DataTipi[i]);
            }
        }
    }
    for (var i = 0; i < detalle.length; i++) {
        // POPULATE SELECT ELEMENT WITH JSON.
        ddlDet.innerHTML = ddlDet.innerHTML +
            '<option value="' + i + '">' + detalle[i].detalle + '</option>';
    }
}


function loadDataClientes() {
    let cliDataCntct = [];
    $.get(URI + 'GetCli', function (response, status) {
        let DataContacto = JSON.parse(JSON.stringify(response));



        for (var i = 0; i < DataContacto.length; i++) {
            if (DataContacto[i].codigo == parseInt(CodCliente)) {
                cliDataCntct.push(DataContacto[i]);

            };

        };

        document.getElementById('lblCodCliente').innerHTML = cliDataCntct[0].codigo;
        document.getElementById('lblNomCliente').innerHTML = cliDataCntct[0].cliente;
        document.getElementById('lblNomEmpresa').innerHTML = cliDataCntct[0].comercio;
        document.getElementById('lblCelCliente').innerHTML = cliDataCntct[0].celular;
        document.getElementById('lblTelCliente').innerHTML = cliDataCntct[0].trabajotelefono;
        document.getElementById('lblMailCliente').innerHTML = cliDataCntct[0].correo;
        document.getElementById('lblDirCliente').innerHTML = cliDataCntct[0].direccion;
    });

};

function loadLlamadas(codCli) {
    DataCall = [];
    $.ajax({
        type: 'POST',
        url: URI + 'GetCall',
        crossDomain: true,
        data: { search: codCli },
        dataType: 'json',
        success: function (response) {
            DataCall = JSON.parse(JSON.stringify(response));
            if (DataCall.length > 0) {

                loadSubs(DataCall[0].tipificacion);
                loadDet(DataCall[0].subtipificacion);

                $("#ddlTipi").find("option").filter(function () {
                    return this.innerHTML == DataCall[0].tipificacion;

                }).attr("selected", true);


                $("#ddlSub").find("option").filter(function () {
                    return this.innerHTML == DataCall[0].subtipificacion;
                }).attr("selected", true);


                $("#ddlDet").find("option").filter(function () {
                    return this.innerHTML == DataCall[0].detalle;
                }).attr("selected", true);

                if (DataCall[0].reclamo == 'Si') {
                    $("#chkReclamo").prop("checked", true);
                };
                if (DataCall[0].confPedido == 'Si') {
                    $("#chkReclamo").prop("checked", true);
                };
                if (DataCall[0].FactPdt == 'Si') {
                    $("#chkReclamo").prop("checked", true);
                };
                if (DataCall[0].FecPromPag === undefined) { } else {
                    $("#InputFecPago").val(moment(DataCall[0].FecPromPag).format('L'))
                };
                $("#CSATV").val(DataCall[0].CSATV);
                $("#CSATE").val(DataCall[0].CSATE);
                $("#prbCompra").val(DataCall[0].ProbabilidadCompra);
                document.getElementById('lblPriCont').innerHTML = (moment(DataCall[0].priCont).format('LT'));
                document.getElementById('lblSegCont').innerHTML = (moment(DataCall[0].segCont).format('LT'));
                document.getElementById('lblTerCont').innerHTML = (moment(DataCall[0].terCont).format('LT'));
            }
        },
        error: function (response) {
            console.log('POST failed.');
        }
    })
    //llenar campos

};


function loadActualizarDatos(codCli) {
    DataActualiza = [];
    $.ajax({
        type: 'POST',
        url: URI + 'GetActualiza',
        crossDomain: true,
        data: { search: codCli },
        dataType: 'json',
        success: function (response) {
            DataActualiza = JSON.parse(JSON.stringify(response));
            if (DataActualiza.length > 0) {
                $("#updTel").val(DataActualiza[0].telefono);
                $("#updCel").val(DataActualiza[0].celular);
                $("#updMail").val(DataActualiza[0].correo);
                $("#updDir").val(DataActualiza[0].direccion);
            }
        },
        error: function (response) {
            console.log('POST failed.');
        }
    })
    //llenar campos

};

function RegCall(codCli) {
    updStr = "";
    let vTipificacion = $("#ddlTipi :selected").text();
    let vSubtipificacion = $("#ddlSub :selected").text();
    let vDetalle = $("#ddlDet :selected").text();
    let vReclamo = "";
    let vCobro = "";
    let vPedido = "";
    let vFecpago = "";
    let vCSATV = "";
    let vCSATE = "";
    let vProbCompra = "";
    if ($('#chkReclamo').prop('checked')) { vReclamo = 'Si' } else { vReclamo = 'No' }
    if ($('#chkPedido').prop('checked')) { vPedido = 'Si' } else { vPedido = 'No' }
    if ($('#chkCobro').prop('checked')) { vCobro = 'Si' } else { vCobro = 'No' }
    if ($('#InputFecPago').val().length > 0) {
        vFecpago = $('#InputFecPago').val().split('/')[1] + '/' + $('#InputFecPago').val().split('/')[0] + '/' + $('#InputFecPago').val().split('/')[2];
    } else {
        vFecpago = "vacio";
    };
    vCSATV = $('#CSATV').val();
    vCSATE = $('#CSATE').val();
    vProbCompra = $('#prbCompra').val();
    if (document.getElementById('lblPriCont').innerHTML.length > 1) {
        var lblPriCon = document.getElementById('lblPriCont').innerHTML;
        var lblSegCon = document.getElementById('lblSegCont').innerHTML;
        var lblTerCon = document.getElementById('lblTerCont').innerHTML;

        if (lblPriCon == lblSegCon || lblPriCon == lblTerCon) {
            if (lblPriCon == lblSegCon) {
                updStr += `segCont = NOW()`;
            } else {
                updStr += `terCont = NOW()`;
            }
            getUpdStr();
            updStr += ` Where codCliente = ${codCli}`;
            $.ajax({
                type: 'POST',
                url: URI + 'UpdCall',
                crossDomain: true,
                data: { search: updStr },
                dataType: 'json',
                success: function (response) {
                    //respuesta = JSON.parse(JSON.stringify(response));\
                    console.log('Exito');
                },
                error: function (response) {
                    console.log('POST failed.');
                }
            })
            //si ha cambiado actualizar
        }
    } else {
        let DataActualiza = [{ codCliente: codCli, tipificacion: vTipificacion, subtipificacion: vSubtipificacion, detalle: vDetalle, reclamo: vReclamo, pedido: vPedido, cobro: vCobro, fecprompag: vFecpago, CSATV: vCSATV, CSATE: vCSATE, probCompra: vProbCompra, plugestor: Codgestor }];
        $.ajax({
            type: 'POST',
            url: URI + 'InsertCall',
            crossDomain: true,
            data: { search: DataActualiza },
            dataType: 'json',
            success: function (response) {
                console.log("Exito")
            },
            error: function (response) {
                console.log('POST failed.');
            }
        })
        //llenar campos
    }
};

function validarDdlUp(objUpd, qfield, jfield) {

    if ($(`#${objUpd} :selected`).text() == jfield) {

    } else {
        var hfield = $(`#${objUpd} :selected`).text();
        updStr += `, ${qfield} = '${hfield}'`;
    }
}
//reclamo, pedido, cobro
function validarChkUp(objUpd, qfield) {
    if ($(`#${objUpd}`).prop('checked')) {
        updStr += `, ${qfield} = 'Si' `
    } else {
        updStr += `, ${qfield} = 'No' `
    }
}

function validarInpUp(objUpd, qfield, jfield) {
    var hfield = $(`#${objUpd}`).val();

    if (hfield != "") {
        if (jfield === undefined) {
            if (qfield == 'FecPromPag') {
                hfield = hfield.split('/')[1] + '/' + hfield.split('/')[0] + '/' + hfield.split('/')[2];
            }

            updStr += `, ${qfield} = '${hfield}'`;

        } else {
            if (qfield == 'FecPromPag') {
                jfield = jfield.split('T')[0]
                jfield = jfield.split('-')[1] + '/' + jfield.split('-')[2] + '/' + jfield.split('-')[0];
                hfield = hfield.split('/')[1] + '/' + hfield.split('/')[0] + '/' + hfield.split('/')[2];

            }
            if ($(`#${objUpd}`).val() == jfield) {
            } else {
                updStr += `, ${qfield} = '${hfield}'`;
            }
        };
    } else {
    }
}



function getUpdStr() {
    validarDdlUp('ddlTipi', 'tipificacion', DataCall[0].tipificacion);
    validarDdlUp('ddlSub', 'subtipificacion', DataCall[0].subtipificacion);
    validarDdlUp('ddlDet', 'detalle', DataCall[0].detalle);
    validarChkUp('chkReclamo', 'reclamo');
    validarChkUp('chkPedido', 'confPedido');
    validarChkUp('chkCobro', 'FactPdt');
    validarInpUp('InputFecPago', 'FecPromPag', DataCall[0].FecPromPag);
    validarInpUp('CSATV', 'CSATV', DataCall[0].CSATV);
    validarInpUp('CSATE', 'CSATE', DataCall[0].CSATE);
    validarInpUp('prbCompra', 'ProbabilidadCompra', DataCall[0].ProbabilidadCompra);
    //
}


function ValidarContacto(objUpd, qfield, jfield) {
    var hfield = $(`#${objUpd}`).val();

    var strcontactos = "";
    if (jfield === undefined) {
        strcontactos += `, ${qfield} = '${hfield}'`;
    } else {
        if ($(`#${objUpd}`).val() == jfield) {
        } else {
            strcontactos += `, ${qfield} = '${hfield}'`;
        }
    }
    console.log(strcontactos)
    return strcontactos;
}
function updContacto(codCli) {
    console.log(DataActualiza);

    var updCntc = "";
    if (DataActualiza[0].telefono === undefined) { } else {updCntc += ValidarContacto('updTel', 'telefono', DataActualiza[0].telefono);}
    if (DataActualiza[0].celular === undefined) { } else {updCntc += ValidarContacto('updCel', 'celular', DataActualiza[0].celular);}
    if (DataActualiza[0].correo === undefined) { } else {updCntc += ValidarContacto('updMail', 'correo', DataActualiza[0].correo);}
    if (DataActualiza[0].direccion === undefined) { } else {updCntc += ValidarContacto('updDir', 'direccion', DataActualiza[0].direccion);}

    updCntc += ` Where codigo = ${codCli}`;

    console.log(updCntc);
    $.ajax({
        type: 'POST',
        url: URI + 'UpdCont',
        crossDomain: true,
        data: {search: updCntc},
        dataType: 'json',
        success: function (response) {
            //respuesta = JSON.parse(JSON.stringify(response));\
            console.log('Exito');
        },
        error: function (response) {
            console.log('POST failed.');
        }
    })
}
