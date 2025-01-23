<?php

    include_once("conecta.php");

	//Soma das notas
	$sql = "SELECT SUM(Despesa) FROM Janeiro";
	$resultado = mysqli_query($conexao, $sql);
	$soma = mysqli_fetch_array($resultado);
	echo $soma[0];

    mysqli_close($conexao);
?>