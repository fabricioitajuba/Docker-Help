<?php

    include_once("conecta.php");

	$sql = "SELECT * FROM Janeiro";
	$res = mysqli_query($conexao, $sql);			

    while($linha = mysqli_fetch_array($res)){
        echo "<tr>
            <td>".$linha['id']."</td>
            <td>".$linha['data_hora']."</td>
            <td>".$linha['Descritivo']."</td>
            <td>".$linha['Lucro']."</td>
            <td>".$linha['Despesa']."</td>
            <td>              
                <button onclick='editaLinhaTabela(".$linha['id'].", \"".$linha['Descritivo']."\", ".$linha['Lucro'].", ".$linha['Despesa'].")'>Editar</button>
                <button onclick='deletaLinhaTabela(".$linha['id'].")'>Deletar</button>                
            </td>
        </tr>";	
    }

    mysqli_close($conexao);
?>