<?php

	//Conexao com o bando de dados
	$servidor = "db";
	$usuario = "admin";
	$senha = "pass";
	$dbname = "myDb";
	
	//Criar a conexao
	$conexao = mysqli_connect($servidor, $usuario, $senha, $dbname);
	
	if($conexao){
		//echo "Conexao realizada com sucesso";		
	}else{
		die("Falha na conexao: " . mysqli_connect_error());
	}
	//Fim da conexao

?>
