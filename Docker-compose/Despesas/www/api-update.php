<?php

  require 'conecta.php';

  $json_str = file_get_contents("php://input");
  $obj = json_decode($json_str, true);

  //echo json_encode($obj);

  try{
    $stmt = $conn->prepare("UPDATE Janeiro SET Descritivo = :descricao, Lucro = :lucro, Despesa = :despesa WHERE id = :id");
    $stmt->execute($obj);

    echo json_encode(["Status" => "ok"]);
  }
  catch(PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
  }  

?>