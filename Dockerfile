FROM node:22-alpine3.19 AS build
COPY . /app
WORKDIR /app
RUN npm install && \
  npm run build

FROM node:22-alpine3.19 AS runtime
RUN mkdir -p /app
WORKDIR /app
COPY ./package.json ./package-lock.json .
RUN npm install --production
COPY --from=build /app/dist /app/dist

RUN apk add --no-cache curl bash

RUN curl -sSLo /usr/local/bin/wait-for-it https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh && chmod +x /usr/local/bin/wait-for-it

COPY link.sh /usr/local/bin/link.sh
RUN chmod +x /usr/local/bin/link.sh

ENTRYPOINT ["link.sh"]
CMD ["wait-for-it", "vehicle-database:5432", "--timeout=30", "--", "node", "/app/dist/server.js"]
