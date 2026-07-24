#!/bin/sh
set -e

mkdir -p /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/framework/cache \
         /var/www/html/storage/logs \
         /var/www/html/bootstrap/cache

chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
chmod -R ug+rwx /var/www/html/storage /var/www/html/bootstrap/cache

if ! grep -q "^APP_KEY=base64:" /var/www/html/.env; then
    php artisan key:generate --force
fi

php artisan migrate --force

exec "$@"
