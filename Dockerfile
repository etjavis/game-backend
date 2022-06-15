FROM node:18-alpine3.14 as base

WORKDIR /usr/src

FROM base as dev
RUN yarn install

CMD [ "yarn", "start:dev" ]

