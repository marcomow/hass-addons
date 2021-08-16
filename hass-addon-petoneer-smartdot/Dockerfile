ARG BUILD_FROM
FROM ${BUILD_FROM}

ENV LANG C.UTF-8

RUN apk add --no-cache npm libusb-dev bluez-dev linux-headers eudev-dev build-base python3 git

RUN mkdir -p /app
WORKDIR /app

COPY ./package.json /app/package.json
RUN npm install --no-audit --production

COPY . /app
WORKDIR /app

CMD [ "npm", "start" ]

# Build arguments
ARG BUILD_ARCH
ARG BUILD_DATE
ARG BUILD_REF
ARG BUILD_VERSION

# Labels
LABEL \
    io.hass.name="smartdot" \
    io.hass.description="Add-on for Home Assistant to control Petoneer's Smart Dot" \
    io.hass.arch="${BUILD_ARCH}" \
    io.hass.type="addon" \
    io.hass.version=${BUILD_VERSION} \
    maintainer="marcomow" \
    org.label-schema.description="Add-on for Home Assistant to control Petoneer's Smart Dot" \
    org.label-schema.build-date=${BUILD_DATE} \
    org.label-schema.name="smartdot" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.url="https://github.com/marcomow/hass-addons/tree/master/smartdot" \
    org.label-schema.usage="https://github.com/marcomow/hass-addons/tree/master/smartdot/README.md" \
    org.label-schema.vcs-ref=${BUILD_REF} \
    org.label-schema.vcs-url="https://github.com/marcomow/hass-addons/tree/master/smartdot" \
    org.label-schema.vendor="Community Hass.io Addons"