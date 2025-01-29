<?php

    require 'conecta.php';

    $json_str = file_get_contents("php://input");
    $obj = json_decode($json_str, true);
  
    //echo json_encode($obj);
    //print_r($obj);

    try{
        $stmt = $conn->query($obj['comando']);
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($tasks);
    }
    catch(PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
    }  
?>