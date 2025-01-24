<?php

    include_once("conecta.php");

	$sql = "SELECT * FROM Janeiro";  
	$res = mysqli_query($conexao, $sql);			

    while($linha = mysqli_fetch_array($res)){
        echo "<tr>
            <td>".$linha['id']."</td>
            <td>".date("d/m/Y H:i:s", strtotime($linha['data_hora']))."</td>
            <td><b>".$linha['Descritivo']."</b></td>
            <td>".$linha['Lucro']."</td>
            <td>".$linha['Despesa']."</td>
            <td>              
                <button onclick='editaLinhaTabela(".$linha['id'].", \"".$linha['Descritivo']."\", ".$linha['Lucro'].", ".$linha['Despesa'].")' class='btn btn-warning'>Editar</button>
                <button onclick='deletaLinhaTabela(".$linha['id'].")' class='btn btn-danger'>Deletar</button>                
            </td>
        </tr>";	
    }

    mysqli_close($conexao);
?>