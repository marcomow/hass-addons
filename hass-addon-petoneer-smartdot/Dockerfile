ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8
RUN apt update && apt install -y mc bluetooth bluez libbluetooth-dev libudev-dev
SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN apk add --no-cache \
    nodejs \
    npm \
    git

COPY package.json /
COPY index.js /
RUN cd / && npm install --unsafe-perm

COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]