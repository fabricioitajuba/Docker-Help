Apache com PHP client para trabalhar com influxdb

-Para construir a imagem do apache com php client para o influxdb:
$ docker build -t fabricioitajuba/apache-phpclient-influxdb:latest .

-Para criar os containers:
$ docker compose up -d

-Acesse o container através do seguinte comando:
$ docker exec -it apache-php-influxdb /bin/bash

-Digite as seguintes linhas de comando dentro do container:
# composer require monolog/monolog
# composer require influxdata/influxdb-client-php guzzlehttp/guzzle
# exit

-Para "derrubar" os containers, apagar os volumes e redes:
# docker compose down -v

-Para acessar a página:
no navegador: localhost:80

-Para acessar o influxdb:
no navegador: localhost:8086  

