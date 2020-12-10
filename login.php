<?php
include "conn.php";
session_start();

$username = $_POST['username'];
$password = $_POST['password'];

$username = stripcslashes($username);
$password = stripcslashes($password);

if($username =1 and $password=1)
{
    header("location: home.php");
}
else
{
    echo  "Error en registro";
}



/*
$query =  "select * from usuarios where NOMBRE = '". $username ."' AND CLAVE ='".$password."' ";
if($resultado=$user->squery($query)){
    foreach ($resultado as $value) {
    }
   //echo "Bienvenido ". $resultado->value['Nombre'];
   $_SESSION['plugestor'] = $value['PLUGestor'];
   $_SESSION['username'] = $value['Nombre'];
   $_SESSION['password'] = $value['Clave'];
    header("location: home.php");
  
   //echo $value['PLUGestor']."-".$value['Nombre']."<br>";
}else{
    echo  "Error en registro";
}*/
    


?>