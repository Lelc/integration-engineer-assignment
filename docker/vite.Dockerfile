FROM node:20-alpine

# Minimal PHP CLI, just enough to run `artisan` (used by Laravel's Wayfinder vite plugin)
RUN apk add --no-cache \
    php85 \
    php85-cli \
    php85-mbstring \
    php85-openssl \
    php85-pdo \
    php85-pdo_mysql \
    php85-tokenizer \
    php85-xml \
    php85-ctype \
    php85-session \
    php85-fileinfo \
    php85-phar \
    php85-dom \
    && ln -s /usr/bin/php85 /usr/bin/php

WORKDIR /var/www/html
