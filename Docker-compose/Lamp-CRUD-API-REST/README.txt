-Lamp -> apache, php, mysql, phpmyadmin (melhorado)

Este exemplo cria o banco de dados caso não exista.
O arquivo .env possui as variáveis de ambiente, renomeie o arquivo
"env.txt" para ".env"

-Para construir a imagem do apache :
# docker build -t fabricioitajuba/apache-php-mysqli-pdo-json:latest .

-Para criar os containers:
# docker compose --env-file .env up -d

- Para "derrubar" os containers, apagar os volumes e redes:
# docker compose down -v

-Para acessar a página:
no navegador: localhost:80

-Para acessar o phpmyadmin:
no navegador: localhost:81  

Servidor: db
Usuário: root ou admin
Senha: pass

senhas: root/pass ou admin/pass
