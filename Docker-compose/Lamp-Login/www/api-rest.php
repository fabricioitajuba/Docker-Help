<?php

    //header("Access-Control-Allow-Headers: Content-Type");
    header("Access-Control-Allow-Headers:Access-Control-Allow-Mehtods,Content-Type,Access-Control-Allow-Mehtods,Authorization,X-Requested-With");  
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json"); 

    //echo json_encode($_SERVER['REQUEST_METHOD']);

    if($_SERVER['REQUEST_METHOD'] === 'GET'){

        include_once 'conecta.php';

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

        include_once 'conecta.php';

        $json_str = file_get_contents("php://input");
        $obj = json_decode($json_str, true);

        $login = $obj["login"];
        $senha = $obj["senha1"];

        //Verifica se o usuário existe!
        $query = "SELECT login FROM Usuarios WHERE login = '".$login."' LIMIT 1";
        $stmt = $conn->query($query);
        $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if($tasks[0]["login"]){
            $resposta = false;
            echo json_encode(["Status" => $resposta]);
        }
        else{
            //Caso não exita, inclui no banco de dados
            $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
            //$senha_hash = $senha;
            $sql = "INSERT INTO Usuarios(login, senha) VALUES('".$login."', '".$senha_hash."')";
            try{
                $stmt = $conn->prepare($sql);
                $stmt->execute();

                $resposta = true;
                echo json_encode(["Status" => $resposta]);
            }        
            catch(PDOException $e){
                echo json_encode(['error' => $e->getMessage()]);
            }
        }
    }
    else if($_SERVER['REQUEST_METHOD'] === 'PUT'){

        include_once 'conecta.php';

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

        include_once 'conecta.php';

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