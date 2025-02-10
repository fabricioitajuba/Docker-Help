#!/usr/bin/env php
<?php

declare(strict_types=1);

use Swoole\WebSocket\Frame;
use Swoole\WebSocket\Server;

$servidor = new Server('0.0.0.0', 9501);

$servidor->on('Message', function(Server $servidor, Frame $mensagem){
    
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