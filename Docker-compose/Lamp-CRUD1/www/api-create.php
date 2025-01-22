<?php
  //print_r($_POST);
  if(isset($_POST)){

    $data = file_get_contents("php://input");
    $data = json_decode($data, true); //return a php array
    
    $nome = $data["nome"];
    $nota = $data["nota"];

    //echo $nome;
    //echo $data;

    include_once("conecta.php");

    $sql = "INSERT INTO Person(nome, nota) VALUES ('$nome','$nota')";
    $res = mysqli_query($conexao, $sql);

    mysqli_close($conexao);

    echo "ok";
  }

?>