<!doctype html>

<?php
header("Access-Control-Allow-Origin: *");

include "conn.php";

session_start();

?>


<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="icon" href="images/fh2.ico">

    <title>AdminFH</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/4.1/examples/sign-in/">

    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/signin.css" rel="stylesheet">
    <script src = "https://code.jquery.com/jquery-3.5.1.slim.min.js"
				integrity = "sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
				crossorigin = "anonymous" ></script>
			<script src="https://code.jquery.com/jquery-3.1.1.min.js">
				
			</script>

    
<script type="text/javascript" src="JS/Login.js"></script>        
		
  </head>

  <body class="text-center">
    <form class="form-signin" action="" method="POST">
      <img class="rounded" src="images/fh.png" alt="" width="72" height="72">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="username" class="sr-only">Usuario</label>
      <input type="input" id="input" class="form-control" placeholder="Usuario" name="username" required autofocus>
      <label for="password" class="sr-only">Contraseña</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Constraseña" name="password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Recordarme
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="button">Ingresar</button>
      
    </form>
 
  </body>
</html>
