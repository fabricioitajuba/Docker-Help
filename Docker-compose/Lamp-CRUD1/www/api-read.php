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
                <button type='button' class='btn btn-editar'>Editar</button>
                <button type='button' class='btn btn-deletar'>Deletar</button>
            </td>
        </tr>";	
    }

    mysqli_close($conexao);
?>