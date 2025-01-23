<?php
  //print_r($_POST);
  if(isset($_POST)){

    $data = file_get_contents("php://input");
    $data = json_decode($data, true); //return a php array
    
    $id = $data["id"];
    $nome = $data["nome"];
    $nota = $data["nota"];

    //echo $id;
    //echo $nome;
    //echo $nota;

    include_once("conecta.php");

    $sql = "UPDATE Person SET nome='$nome', nota='$nota' WHERE Person.id = '$id'";
    $res = mysqli_query($conexao, $sql);

    mysqli_close($conexao);

    echo "ok";
  }

?>