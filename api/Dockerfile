FROM php:8.1-fpm

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
  && apt-get install -y \
  git \
  curl \
  libpng-dev \
  libonig-dev \
  libxml2-dev \
  zip \
  unzip \
  zlib1g-dev \
  libpq-dev \
  libzip-dev \
  nginx && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath gd

WORKDIR /api

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

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

COPY .docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80

ENTRYPOINT [ "/entrypoint.sh"]



