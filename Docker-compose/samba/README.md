#Executando o container SAMBA através do docker

Fonte: https://hub.docker.com/r/dperson/samba

Estrutura do diretório:

samba/
├── data
│   └── smb.conf
└── docker-compose.yml


- Para subir o container:
$ docker-compose up -d

- Adicionando um usuário e senha:
$ docker exec -it samba samba.sh -u "usuario;senha"

- Caso precise alterar o smb.conf na pasta /data, reinicie o container:
$ docker-compose restart

- Para parar o container e deletar os volumes:
$ docker-compose down -v
