<?php
    //Destroi todas as variáveis do php
    unset($login);
    unset($senha);
    unset($tasks);
    unset($resposta);
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

                $resposta = "<span style='color: #ff0000'>confirmado!</span>";
                $login = null;
                $senha = null;

                //redirecionando para o site
                header('Location: /site.php');
            }
            else{
                $resposta = "<span style='color: #ff0000'>login ou senha incorretos!</span>";
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
        <button type="submit">LOGIN</button>
        <a href="inscrever.html">Inscrever</a>
        <span id="resposta"><?php echo $resposta ?></span>
    </form>
    <script src="index.js"></script> 
</body>
</html>