<?php

require './vendor/autoload.php';

use InfluxDB2\Client;
use InfluxDB2\Model\WritePrecision;
use InfluxDB2\Point;

//Conexão com o banco
$token = getenv('token');
$org = 'org';
$bucket = 'bucket';

$client = new Client([
    "url" => "http://localhost:8086",
    "token" => $token,
]);

print_r($client) ;

//Escrever no banco
$writeApi = $client->createWriteApi();
$data = "mem,host=host1 used_percent=23.43234543";
$writeApi->write($data, WritePrecision::S, $bucket, $org);



?>