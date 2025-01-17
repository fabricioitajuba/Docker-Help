- Para compilar:
$ docker build -t flr-api-php1:latest .

- Para criar o container:
$ docker run -d -p 7376:80 --name api-php1 flr-api-php1

- Para criar o container via docker compose:
$ docker compose up -d

- Para derrubar o container, volumes e redes:
$ docker compose down -v