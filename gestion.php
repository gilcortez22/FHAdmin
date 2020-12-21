<?php


?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- Bootstrap core CSS -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
  <!-- Material Design Bootstrap -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.19.1/css/mdb.min.css" rel="stylesheet">

  <!-- Custom styles for this template -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js"> </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>

  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.1/moment.min.js" integrity="sha512-qTXRIMyZIFb8iQcfjXWCO8+M5Tbc38Qi5WzdPOYZHIlZpzBHG3L3by84BBBOiRGiEb7KKtAOAs5qYdUiZiQNNQ==" crossorigin="anonymous"></script>
  
  <script src="JS/bootstrap-datepicker.min.js" charset="utf-8"></script>

  <link rel="stylesheet" href="Css/bootstrap-datepicker.css">
  <script type="text/javascript" src="JS/gestion.js"></script>

</head>

<body>


  <nav class="navbar navbar-expand-lg navbar-dark" Style="background-color:#ea6224; font-family: inherit;">

    <!-- Navbar brand -->
    <Strong><a class="navbar-brand" href="">Funes Hartmann</a></Strong>

    <!-- Collapse button -->
    <button class="navbar-toggler" type="button" data-target="#basicExampleNav" aria-label="Toggle navigation">
    </button>

  </nav>

  <div class="container-fluid" id="container">
    <div class="row">
      <div class="col-3">
        <h4>
          <span class="badge badge-primary">Datos del Cliente </span>
        </h4>
        <div class="row"><strong><label class="font-weight-bold">Código:</label></strong></div>
        <div class="row"><label id="lblCodCliente"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Nombre:</label></strong></div>
        <div class="row"><label id="lblNomCliente"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Nombre Comercial:</label></strong></div>
        <div class="row"><label id="lblNomEmpresa"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Telefono Celular:</label></strong></div>
        <div class="row"><label id="lblCelCliente"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Telefono Fijo:</label></strong></div>
        <div class="row"><label id="lblTelCliente"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Email:</label></strong></div>
        <div class="row"><label id="lblMailCliente"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Direccion:</label></strong></div>
        <div class="row"><label id="lblDirCliente"></label></div>



      </div>
      <div class="col-3">

        <h4>
          <span class="badge badge-primary">Datos Visita </span>
        </h4>
        <div class="row"><strong><label class="font-weight-bold">Fecha de Visita:</label></strong></div>
        <div class="row"><label id="lblFecVisita"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Estado de Visita:</label></strong></div>
        <div class="row"><label id="lblNovedad"></label></div>
        <div class="row"><strong><label class="font-weight-bold">Comentario de Visita:</label></strong></div>
        <div class="row">
          <textarea id="txtComent" class="form-control rounded-0" rows="10"></textarea>
        </div>


      </div>
      <div class="col-6 ml-auto">

        <h4>
          <span class="badge badge-primary">Gestion Call Center </span>
        </h4>
        <h4>
          <label class="font-weight-bold">Llamada de seguimiento</label>
        </h4>


        <div class="input-group input-group-sm mb-3">
          <select class="browser-default custom-select" id="ddlTipi">
            <option selected="">Tipificacion</option>
          </select>
          <select class="browser-default custom-select" id="ddlSub">
            <option selected="">SubTipificacion</option>
          </select>
          <select class="browser-default custom-select" id="ddlDet">
            <option selected="">Detalle</option>
          </select>
        </div>

        <div class="input-group input-group-sm mb-3">
          <div class="row justify-content-center align-items-center">
            <div class="col-2">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="chkReclamo">
                <label class="form-check-label" for="chkReclamo">Reclamo</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="chkPedido">
                <label class="form-check-label" for="chkPedido">Pedido Valido</label>
              </div>
            </div>
            <div class="col-3">
              <div class="form-check">
                <input type="checkbox" class="form-check-input" id="chkCobro">
                <label class="form-check-label" for="chkCobro">Cobro Pend.</label>
              </div>

            </div>
            <div class="col-4">

              <div class="input-group date" data-provide="datepicker" id="fecPago">
                <input type="text" class="form-control" placeholder="Fecha Pago" id="InputFecPago">
                <div class="input-group-addon">
                  <span class="glyphicon glyphicon-th"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="input-group input-group-sm mb-3">
          <div class="row">
            <div class="col">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">CSAT Vendedor</span>
                </div>
                <input type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="CSATV">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">CSAT Ejecutivo</span>
                </div>
                <input type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="CSATE">
              </div>
            </div>
            <div class="col">
              <div class="input-group input-group-sm mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="inputGroup-sizing-sm">Prob. Compra</span>
                </div>
                <input type="number" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="prbCompra">
              </div>
            </div>
          </div>
        </div>
        <h4>
          <label class="font-weight-bold">Actualización de datos</label>
        </h4>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Telefono Fijo</span>
          </div>
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="updTel">
        </div>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">

            <span class="input-group-text" id="inputGroup-sizing-sm">Telefono Celular</span>
          </div>
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="updCel">
        </div>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Correo</span>
          </div>
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="updMail">
        </div>
        <div class="input-group input-group-sm mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-sm">Dirección</span>
          </div>
          <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm" id="updDir">
        </div>
        <div class="container">
          <div class="row">
            <div class="col">
              <div class="row"><label class="font-weight-bold">Primer Contacto</label></div>
              <div class="row"><label id="lblPriCont"></label></div>
            </div>
            <div class="col">
              <div class="row"><label class="font-weight-bold">Segundo Contacto</label></div>
              <div class="row"><label id="lblSegCont"></label></div>
            </div>
            <div class="col">
              <div class="row"><label class="font-weight-bold">Tercer Contacto</label></div>
              <div class="row"><label id="lblTerCont"></label></div>
            </div>
          </div>
        </div>
        <button type="button" class="btn btn-success" id="registrar">Registrar</button>
      </div>
    </div>
  </div>
</body>

</html>