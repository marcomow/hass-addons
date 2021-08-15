ARG BUILD_FROM
FROM $BUILD_FROM

ENV LANG C.UTF-8

RUN apt update && apt install -y mc bluetooth bluez libbluetooth-dev libudev-dev

CMD npm install && node index.js

COPY run.sh /
RUN chmod a+x /run.sh

CMD [ "/run.sh" ]