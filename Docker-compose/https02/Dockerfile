# Use an official PHP image with Apache
FROM php:8.4-apache

# Install Nano (optional)
RUN apt-get update && \
    apt-get install -y nano && \
    rm -rf /var/lib/apt/lists/*

# Copy SSL certificate and key
COPY ./cert/localhost.crt /etc/ssl/certs/localhost.crt
COPY ./cert/localhost.key /etc/ssl/private/localhost.key

# Copy the custom Apache virtual host config
COPY ./conf/my-ssl.conf /etc/apache2/sites-available/my-ssl.conf

# Enable SSL module, configure Apache for PHP support, and enable our SSL site configuration
RUN a2enmod ssl && \
    a2enmod rewrite && \
    a2dissite 000-default default-ssl && \
    a2ensite my-ssl
