FROM debian:buster
RUN echo 'deb http://deb.debian.org/debian buster-backports main' > /etc/apt/sources.list.d/backports.list
RUN apt-get update &&  apt-get install -y \
curl \
python \
wget \
supervisor \
gnupg \
apt-transport-https \
apt-utils 
RUN /openalpr-buster.sh
VOLUME /etc/openalpr/
EXPOSE 3000 11300
RUN mkdir -p   /var/log/supervisor
COPY alprd.conf /etc/openalpr/alprd.conf
CMD ["/usr/bin/alprd -f"]