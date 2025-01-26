<?php

    require 'conecta.php';

    try{
        $stmt = $conn->query('SELECT * FROM Person');
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($tasks);
    }
    catch(PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
    }
?>