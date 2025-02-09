#!/usr/bin/env php
<?php

use Swoole\WebSocket\Frame;
use Swoole\WebSocket\Server;

$servidor = new Server(host: '0.0.0.0', port:9501);

$servidor->on(event_name: 'message', function(Server $servidor, Frame $mensagem){
    /** @var \Swoole\Connection\Interator $conexoes */

    $conexoes = $servidor->connections;
    $origem = $mensagem->fd;

    foreach($conexoes as $conexao){
        
        if($conexao === $origem){
            continue;
        }
        
        $servidor->push(
            $conexao, 
            json_encode(['type' => 'chat', 'text' => $mensagem->data])
        );
    }
});

$servidor->start();
