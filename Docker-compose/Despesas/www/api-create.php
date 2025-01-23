<?php
  //print_r($_POST);
  if(isset($_POST)){

    $data = file_get_contents("php://input");
    $data = json_decode($data, true); //return a php array
    
    $descricao = $data["descricao"];
    $lucro = $data["lucro"];
    $despesa = $data["despesa"];

    include_once("conecta.php");

    $sql = "INSERT INTO Janeiro(Descritivo, Lucro, Despesa) VALUES ('$descricao','$lucro','$despesa')";
    $res = mysqli_query($conexao, $sql);

    mysqli_close($conexao);

    echo "ok";
  }

?>