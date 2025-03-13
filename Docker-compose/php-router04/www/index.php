<?php
require './vendor/autoload.php';
//require './routers/router.php';

try{
    //parse_url separa a query string da uri
    $uri = parse_url($_SERVER["REQUEST_URI"])["path"];
    $request = $_SERVER["REQUEST_METHOD"];
    var_dump($request);
}
catch(Exception $e){
    $e->getMessage();
}