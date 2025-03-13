<?php

//Retorna apenas a URI
//echo $_SERVER['REQUEST_URI'];

//Passa a URI e uma função para executa-la:
function rota($rota, $f){

    if($_SERVER['REQUEST_URI'] == $rota){
        $f();   //executa a função
        exit(); //sai do php
    }
}

//Caso a URI for "/" 
rota("/", function(){
    echo "Página inicial";
});

//Caso a URI for "/clientes" 
rota("/clientes", function(){
    echo "Página clientes";
});

echo "Página não encontrada";

