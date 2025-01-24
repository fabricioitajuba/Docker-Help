<?php
    //Status: Não concluido
    if(isset($_POST)){

        $data = file_get_contents("php://input");
        $data = json_decode($data, true); //return a php array

        //Conexao com o bando de dados
        $servidor = "db";
        $usuario = "root";
        $senha = "pass";
        $banco = $data["Banco"];
        
        //Criar a conexao
        $conexao = mysqli_connect($servidor, $usuario, $senha, $banco);
        
        if($conexao){
            //echo "Conexao realizada com sucesso";		
        }else{
            die("Falha na conexao: " . mysqli_connect_error());
        }
        //Fim da conexao        

        $sql = "SHOW TABLES FROM $banco";
        //echo $sql;
        $res = mysqli_query($conexao, $sql);			
    
        while($linha = mysqli_fetch_row($res)){
            echo "<option value=\"".$linha[0]."\">".$linha[0]."</option>";
        }          

        mysqli_close($conexao);
    }
?>