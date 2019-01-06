FROM ubuntu:16.04

ENV ELIXIR_VERSION="v1.5.3" \ 
	LANG=C.UTF-8

# Erlang 20 installation
RUN apt-get update \
    && apt-get install -y software-properties-common build-essential apt-utils dialog sudo wget ca-certificates locales curl git vim nano net-tools \
    && wget https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb \
    && dpkg -i erlang-solutions_1.0_all.deb \
    && apt-get update \
    && apt-get install -y esl-erlang=1:20.3.6 \
    && rm -f erlang-solutions_1.0_all.deb
   
# Elixir 1.5.3 installation
RUN set -xe \
	&& ELIXIR_DOWNLOAD_URL="https://github.com/elixir-lang/elixir/archive/${ELIXIR_VERSION}.tar.gz" \
	&& ELIXIR_DOWNLOAD_SHA256="0fc6024b6027d87af9609b416448fd65d8927e0d05fc02410b35f4b9b9eb9629" \
	&& curl -fSL -o elixir-src.tar.gz $ELIXIR_DOWNLOAD_URL \
	&& echo "$ELIXIR_DOWNLOAD_SHA256  elixir-src.tar.gz" | sha256sum -c - \
	&& mkdir -p /usr/local/src/elixir \
	&& tar -xzC /usr/local/src/elixir --strip-components=1 -f elixir-src.tar.gz \
	&& rm elixir-src.tar.gz \
	&& cd /usr/local/src/elixir \
	&& make install clean

# Postgres Installation
RUN wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add - \
    && sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" >> /etc/apt/sources.list.d/pgdg.list' \
    && apt-get update \
    && apt-get install -y postgresql postgresql-contrib

#Installing nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash - \
    && apt-get update \
    && apt-get install -y nodejs inotify-tools 


COPY pg_hba.conf /etc/postgresql/11/main/pg_hba.conf 
COPY entrypoint.sh /entrypoint.sh

RUN chown postgres:postgres /etc/postgresql/11/main/pg_hba.conf \
    && chmod u+x /entrypoint.sh \
    && chmod 640 /etc/postgresql/11/main/pg_hba.conf 

WORKDIR /data

EXPOSE 4000 5432

ENTRYPOINT ["/entrypoint.sh"]
