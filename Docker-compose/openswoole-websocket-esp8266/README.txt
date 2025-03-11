Servidor Websocket com OpenSwoole recebendo dados de um ESP8266

-Para o ESP8266, gravar o projeto: WebSocket-ESP826601 (no platformio)

-Para criar os containers:
# docker compose up -d

-Para reiniciar os containers:
# docker compose restart

- Para "derrubar" os containers, apagar os volumes e redes:
# docker compose down -v

-Para acessar a página do supervisório:
no navegador: http://localhost

-Para acessar a página do client1:
no navegador: http://localhost/temperatura.php

-Para acessar a página do client2:
no navegador: http://localhost/pressao.php

-Para acessar de status:
no navegador: http://localhost/teste.php