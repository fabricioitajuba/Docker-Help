<?php

    include_once("conecta.php");

	$sql = "SHOW DATABASES";
	$res = mysqli_query($conexao, $sql);			

    while($linha = mysqli_fetch_assoc($res)){
        echo "<option value=\"".$linha['Database']."\">".$linha['Database']."</option>";	
    }    

    mysqli_close($conexao);
?>