<?php

    include_once("conecta.php");

	$sql = "SELECT * FROM Person";
	$res = mysqli_query($conexao, $sql);			

    while($linha = mysqli_fetch_array($res)){
        echo "<tr>
            <td>".$linha['id']."</td>
            <td>".$linha['nome']."</td>
            <td>".$linha['nota']."</td>
            <td>              
                <button onclick='editaLinhaTabela(".$linha['id'].", \"".$linha['nome']."\", ".$linha['nota'].")' class='btn btn-info'>Editar</button>
                <button onclick='deletaLinhaTabela(".$linha['id'].")' class='btn btn-danger'>Deletar</button>                
            </td>
        </tr>";	
    }

    mysqli_close($conexao);
?>