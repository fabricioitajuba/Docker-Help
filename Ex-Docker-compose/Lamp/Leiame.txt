-Lamp -> apache, php, mysql, phpmyadmin

-Criar a seguinte estrutura de diretórios:
.
├── docker-compose.yml
├── Dockerfile
├── mysql
│   └── myDb.sql
└── www
    └── index.php

-Para construir a imagem:
# docker-compose build

-Para executar o container:
# docker-compose up -d

-Para acessar a página:
no navegador: localhost:8080

-Para acessar o phpmyadmin:
no navegador: localhost:8081  senhas: root/root ou admin/admin
