<?php

/*parse_url separa a "uri" e query string, colocando em um vetor
ex: localhost/produto?geladeira=1

uri: /geladeira
query string: geladeira=1

retorno:
array(2) { ["path"]=> string(8) "/produto" ["query"]=> string(11) "geladeira=1" }

*/

try{

    //http://localhost/produto?page=2&column=title&order=ASC

    // Capturamos toda a query string
    $queryString = filter_input(INPUT_SERVER, 'QUERY_STRING');

    // Resultado da query string
    var_dump($queryString);

    //Realizamos o parse da string
    parse_str($queryString, $parseQueryString);

    // Resultado do parse da query string
    echo '<pre>';
    var_dump($parseQueryString);
    echo '</pre>';

    echo "<br>----------<br>";

    //pegar a uri com query string
    $uri_query = parse_url($_SERVER["REQUEST_URI"]);
    var_dump($uri_query);

    echo "<br><br>";

    //pegar a uri
    $uri = parse_url($_SERVER["REQUEST_URI"])['path'];
    var_dump($uri);    

    echo "<br><br>";

    //pegar a query
    $query = parse_url($_SERVER["REQUEST_URI"])['query'];
    var_dump($query);    
    
    echo "<br><br>";

    //Tipo de requisição
    $requisicao = $_SERVER["REQUEST_METHOD"];
    var_dump($requisicao);

    echo "<br><br>";

    $url = 'http://username:password@hostname:9090/path?arg=value#anchor';

    var_dump(parse_url($url));
    var_dump(parse_url($url, PHP_URL_SCHEME));
    var_dump(parse_url($url, PHP_URL_USER));
    var_dump(parse_url($url, PHP_URL_PASS));
    var_dump(parse_url($url, PHP_URL_HOST));
    var_dump(parse_url($url, PHP_URL_PORT));
    var_dump(parse_url($url, PHP_URL_PATH));
    var_dump(parse_url($url, PHP_URL_QUERY));
    var_dump(parse_url($url, PHP_URL_FRAGMENT));

    echo "<br><br>";

    $url = '//www.example.com/path?googleguy=googley';

    // Antes do PHP 5.4.7, o "path" seria "//www.example.com/path"
    var_dump(parse_url($url));    

    //---------------------------------------------

    echo "<br><br>";

}
catch(Exception $e){
    $e->getMessage();
}

