<?php
    session_set_cookie_params(['lifetime' => 10, 'httponly' => true]);
    session_start();
    session_regenerate_id(true);
    
    if($_SESSION['logged_in'] != true){
        $_SESSION['resposta'] = "<span style='color: red'>É necessário fazer login!</span>";
        header('Location: /index.php');
    }
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>site</title>
</head>
<body>
    <h3>site</h3>

    <a href="logout.php"><button>Logout</button></a>
</body>
</html>