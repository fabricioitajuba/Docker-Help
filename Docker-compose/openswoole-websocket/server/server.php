#!/usr/bin/env php
<?php

use Swoole\WebSocket\Server;
use Swoole\Http\Request;
use Swoole\WebSocket\Frame;

$server = new Server("0.0.0.0", 9502);

$server->on("Start", function(Server $server)
{
    echo "Swoole WebSocket Server is started at http://127.0.0.1:9502\n";
});

//Servidor envia
$server->on('Open', function(Server $server, Request $request)
{
    echo "connection open: {$request->fd}\n";

    $server->tick(1000, function() use ($server, $request)
    {
        //$server->push($request->fd, json_encode(["Status", "on"]));
        date_default_timezone_set('America/Sao_Paulo');
        $dados = array("Status" => "on", "Hora" => date('d/m/Y H:i:s', time()));
        $server->push($request->fd, json_encode($dados));
    });
});

// Setup the receive event callback function
/*$server->on('Receive', function ($server, $fd, $reactor_id, $data)
{
    $server->send($fd, "Server: {$data}");
});*/

/*$server->on('Message', function(Server $server, Frame $frame)
{
    echo "received message: {$frame->data}\n";
    $server->push($frame->fd, $frame->data);
});*/

//Recebe os dados e replica
$server->on('Message', function(Server $server, Frame $frame)
{
    echo "received message: {$frame->data}\n";

    foreach($server->connections as $fd){
        
        if(!$server -> isEstablished($fd)){
            continue;
        }
        
        $server->push($fd, $frame->data);
    }
});

$server->on('Close', function(Server $server, int $fd)
{
    echo "connection close: {$fd}\n";
});

$server->on('Disconnect', function(Server $server, int $fd)
{
    echo "connection disconnect: {$fd}\n";
});

$server->start();
