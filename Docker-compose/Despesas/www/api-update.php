<?php
  //print_r($_POST);
  if(isset($_POST)){

    $data = file_get_contents("php://input");
    $data = json_decode($data, true); //return a php array
    
    $id = $data["id"];
    $descricao = $data["descricao"];
    $lucro = $data["lucro"];
    $despesa = $data["despesa"];

    include_once("conecta.php");

    $sql = "UPDATE Janeiro SET Descritivo='$descricao', Lucro='$lucro', Despesa='$despesa' WHERE Janeiro.id = '$id'";
    $res = mysqli_query($conexao, $sql);

    mysqli_close($conexao);

    echo "ok";
  }

?>