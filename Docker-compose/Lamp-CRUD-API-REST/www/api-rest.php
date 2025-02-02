<?php

    //header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Mehtods,Content-Type,Access-Control-Allow-Mehtods,Authorization,X-Requested-With");  
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json"); 

    //echo json_encode($_SERVER['REQUEST_METHOD']);

    if($_SERVER['REQUEST_METHOD'] === 'GET'){

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
    }
    else if($_SERVER['REQUEST_METHOD'] === 'POST'){

        require 'conecta.php';

        $json_str = file_get_contents("php://input");
        $obj = json_decode($json_str, true);

        try{
            $stmt = $conn->prepare("INSERT INTO Person(nome, nota) VALUES(:nome, :nota)");
            $stmt->execute($obj);

            echo json_encode(["Status" => "ok"]);
        }
        catch(PDOException $e){
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    else if($_SERVER['REQUEST_METHOD'] === 'PUT'){

        require 'conecta.php';

        $json_str = file_get_contents("php://input");
        $obj = json_decode($json_str, true);
      
        try{
            $stmt = $conn->prepare("UPDATE Person SET nome = :nome, nota = :nota WHERE id = :id");
            $stmt->execute($obj);
      
            echo json_encode(["Status" => "ok"]);
        }
        catch(PDOException $e){
            echo json_encode(['error' => $e->getMessage()]);
        }
    }
    else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){

        require 'conecta.php';

        $id = $_GET['id'];

        $query = "DELETE FROM Person WHERE id = ".$id;

        try{
            $stmt = $conn->prepare($query);
            $stmt->execute();
        
            echo json_encode(["Status" => "ok"]);
        }
        catch(PDOException $e){
            echo json_encode(['error' => $e->getMessage()]);
        }
    }        
    else{
        echo json_encode("Método Desconhecido!");
    }

?>