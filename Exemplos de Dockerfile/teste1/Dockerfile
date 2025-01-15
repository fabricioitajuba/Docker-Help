#Escolhe a última versão do alpine:
FROM alpine:latest

#Atualizando a lista de repositórios e programas:
RUN apk update && apk upgrade

#Entra dentro do diretório home da imagem:
WORKDIR /home

#Cria o diretório /config
RUN mkdir config

#Copia o arquivo "Arquivo.txt" no host para a pasta /home do container
COPY Arquivo.txt ./

