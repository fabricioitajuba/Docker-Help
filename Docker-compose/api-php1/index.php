<?php
   session_start();
   $number = rand(0, 100);
   $dados = array('number' => $number,);
   echo json_encode($dados);
?>
