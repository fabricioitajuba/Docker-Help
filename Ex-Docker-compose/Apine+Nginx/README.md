- Para executar:
$ sudo docker-compose up -d

- No navegador:
localhost:8000

- Para verificar os logs produzidos pelo seu contêiner Nginx, você pode usar o comando logs:

$ docker-compose logs

- Se você quiser pausar a execução do ambiente sem alterar o estado atual dos seus contêineres, você pode usar:

$ docker-compose pause

- Para retomar a execução após emitir uma pausa:

$ docker-compose unpause

- O comando stop terminará a execução do contêiner mas ele não irá destruir quaisquer dados associados aos seus contêineres:

$ sudo docker-compose stop

- Para retornar a execussão:

$ sudo docker-compose start

- Se você quiser remover os contêineres, redes e volumes associados a este ambiente conteinerizado, use o comando down:

$ docker-compose down

- Caso você queira também remover a imagem base do seu sistema, use:

$ docker image rm nginx:alpine
