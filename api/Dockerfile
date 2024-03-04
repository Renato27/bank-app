FROM php:8.1-fpm

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    libonig-dev \
    libxml2-dev \
    && docker-php-ext-install \
    pdo_pgsql \
    pgsql \
    nginx 

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_pgsql

WORKDIR /api

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . /api

RUN composer install --no-interaction --optimize-autoloader --no-dev

ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

RUN groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} www-data

RUN chown -R www-data:www-data /api/storage /api/bootstrap/cache
RUN chmod -R 775 /api/storage /api/bootstrap/cache

COPY /nginx/nginx.conf /etc/nginx/sites-available/default
RUN if [ ! -e /etc/nginx/sites-enabled/default ]; then ln -s /etc/nginx/sites-available/default /etc/nginx/sites-enabled/default; fi

COPY ./.docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT [ "/entrypoint.sh"]



