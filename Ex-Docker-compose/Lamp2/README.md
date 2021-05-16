-Fonte:
https://gist.github.com/jcavat/2ed51c6371b9b488d6a940ba1049189b

-Criar a seguinte estrutura de diretórios:
.
├── docker-compose.yml
├── Dockerfile
├── dump
│   └── myDb.sql
├── sessions
└── www
    └── index.php

-Para construir a imagem:
# docker-compose build

-Para executar o container:
# docker-compose up -d

-Para acessar a página:
no navegador: localhost:8001

-Para acessar o phpmyadmin:
no navegador: localhost:8000
