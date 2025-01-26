<?php

	//Conexao com o bando de dados
	$host = 'db';
	$port = 3306;
	$user = 'admin';
	$pass = 'pass';
	$db = 'myDb';

	try{
		$conn = new PDO("mysql:host=$host; port=$port; dbname=$db; charset=utf8", $user, $pass);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	}
	catch(PDOException $e){
		//Erros relacionados ao banco de dados
		echo 'Erro na conexão com o banco de dados: ' . $e->getMessage();
		exit;
	}
	catch(Exception $e){
		//Erros não relacionados ao banco de dados
		echo 'Erro: ' . $e->getMessage();
		exit;
	}

	//Fim da conexao

?>
