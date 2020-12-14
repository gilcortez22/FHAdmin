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
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.1.1.min.js">

  </script>

  <script type="text/javascript" src="JS/Clientes.js"></script>

</head>

<body>

  <nav class="navbar navbar-expand-lg navbar-dark" Style="background-color:#ea6224; font-family: inherit;">

    <!-- Navbar brand -->
    <Strong><a class="navbar-brand" href="#">Funes Hartmann</a></Strong>

    <!-- Collapse button -->
    <button class="navbar-toggler" type="button" data-target="#basicExampleNav" aria-label="Toggle navigation">
    </button>

    <div class="ml-auto">
    <form method="post" action="index.php">
      <input type="submit" class="btn btn-primary" name="btnCerrar" value="Cerrar Sesion">
    </form>
    </div>

  </nav>

    <form class="form-inline d-flex justify-content-center md-form form-sm" autocomplete="off">
      <input class="form-control form-control-sm mr-3 w-75" type="text" id="search" placeholder="Buscar Cliente" aria-label="Search">
      <i class="fas fa-search" aria-hidden="true"></i>
    </form>
    <div class="container-fluid" id="container"></div>
  
  <div>
    <form class="form-inline d-flex justify-content-center md-form form-sm" autocomplete="off">
      <input class="form-control form-control-sm mr-3 w-75" type="text" id="search2" placeholder="Buscar Producto" aria-label="Search">
      <i class="fas fa-search" aria-hidden="true"></i>
    </form>
  
  <div class="container-fluid" id="container2">

  </div>
</body>

</html>