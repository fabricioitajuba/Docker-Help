<?php
  //print_r($_POST);
  if(isset($_POST)){

    $data = file_get_contents("php://input");
    $data = json_decode($data, true); //return a php array
    
    $id = $data["id"];

    include_once("conecta.php");

    $sql = "DELETE FROM Janeiro WHERE id='$id'";
    $res = mysqli_query($conexao, $sql);

    mysqli_close($conexao);

    echo "ok";
  }

?>