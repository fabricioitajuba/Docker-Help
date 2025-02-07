<?php
    session_start();
    ob_start();
    unset($_SESSION['logged_in']);
    $_SESSION['resposta'] = "<span style=' color: green'>Deslogado com sucesso!</span>";
    header('Location: /index.php');
?>