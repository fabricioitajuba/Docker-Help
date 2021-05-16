FROM ubuntu
MAINTAINER fabricioitajuba
RUN apt-get update && apt-get install -y apache2 && apt-get clean
EXPOSE 80
ENTRYPOINT ["apache2ctl"]
CMD ["-DFOREGROUND"]
#VOLUME ./site:/var/www/html
COPY index.html /var/www/html
#HOSTNAME ubuntu-container
