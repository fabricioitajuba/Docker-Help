<?php

	//Conexao com o bando de dados
	$servidor = "db";
	$usuario = "root";
	$senha = "pass";
	
	//Criar a conexao
	$conexao = mysqli_connect($servidor, $usuario, $senha);
	
	if($conexao){
		//echo "Conexao realizada com sucesso";		
	}else{
		die("Falha na conexao: " . mysqli_connect_error());
	}
	//Fim da conexao

?>
