<?php

    require 'conecta.php';

    try{
        $stmt = $conn->query('SELECT SUM(Lucro) AS Lucro FROM Janeiro');
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($tasks[0]);
    }
    catch(PDOException $e){
        echo json_encode(['error' => $e->getMessage()]);
    }	
?>