<?php
    session_set_cookie_params(['lifetime' => 10, 'httponly' => true]);
    session_start();
    ob_start();
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    
    <?php
        if($_POST){
            //Verifica se o login está cadastrado            
            $login = $_POST["login"];
            $senha = $_POST["senha"];

            include_once 'conecta.php'; //inclui apenas uma vez

            $query = "SELECT login, senha FROM Usuarios WHERE login = '".$login."' LIMIT 1";
            $stmt = $conn->query($query);
            $tasks = $stmt->fetch(PDO::FETCH_ASSOC);

            //var_dump($tasks);
            //var_dump($tasks['login']);
            //var_dump($tasks['senha']);

            if($tasks['login'] == $login && password_verify($senha, $tasks['senha'])){

                $_SESSION['resposta'] = "<span style='color: red'>confirmado!</span>";
                $login = null;
                $senha = null;

                $_SESSION['logged_in'] = true;
                //redirecionando para o site
                header('Location: /site.php');
            }
            else{
                $_SESSION['resposta'] = "<span style='color: red'>login ou senha incorretos!</span>";
            }
        }
    ?>

    <h2>LOGIN</h2>
    <form method="POST" action="">
        <label>Login:</label>
        <input type="text" name="login" id="txt_login" autocomplete="on" value="<?php echo $login ?>">
        <br>
        <label>Senha:</label>
        <input type="password" name="senha" id="txt_senha" autocomplete="on" value="<?php echo $senha ?>">      
        <img src="./img/eye-fill.svg" id="btn_senha" onclick="mostrarSenha()">
        <br>
        <br>
        <button type="submit">Login</button>
        <span id="resposta"><?php echo $_SESSION['resposta'] ?></span>
    </form>
    <br>
    <a href="inscrever.html"><button>Inscrever</button></a>
    <script src="index.js"></script> 
</body>
</html>