<?php

  require 'conecta.php';

  $json_str = file_get_contents("php://input");
  $obj = json_decode($json_str, true);

  //echo json_encode($obj);

  try{
    $stmt = $conn->prepare("INSERT INTO Janeiro(Descritivo, Lucro, Despesa) VALUES (:descritivo, :lucro, :despesa)");
    $stmt->execute($obj);

    echo json_encode(["Status" => "ok"]);
  }
  catch(PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
  }  

?>