O Portainer é um container que gerencia os outros containers de modo gráfico

-Site:
https://www.portainer.io/

-Para instalar no pc

# docker volume create portainer_data

# docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock:z -v portainer_data:/data portainer/portainer-ce


-Para instalar no raspberrypi:
$ sudo docker run -d --name portainer -- privileged -p 9000:9000 -v /var/run/docker.sock:/var/run/docker.sock -v /home/pi/data/portainer:/data portainer/portainer



--Para colocar o portainer rodando como serviço:

-Copiar o arquivo "portainer.service" para dentro da pasta "/etc/systemd/system/"
$ sudo cp portainer.service /etc/systemd/system

-Inicialize o serviço através do seguinte comando:
$ sudo systemctl start portainer

-Para saber se o serviço está rodando:
$ sudo systemctl status portainer

