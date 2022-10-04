FROM node:16-alpine AS base
WORKDIR /home/app
VOLUME /home/app/node_modules board-link_node-modules

FROM base AS build-dependencies
COPY package.json package.json
RUN ["yarn"]

FROM base AS production-dependencies
COPY package.json package.json
RUN ["yarn", "--production"]

FROM base AS config
ARG PORT=80
EXPOSE ${PORT}
ENV PORT ${PORT}

FROM config AS build
COPY --from=build-dependencies /home/app/node_modules node_modules
COPY . . 
RUN ["yarn", "build"]

FROM config AS production
COPY --from=production-dependencies /home/app/node_modules node_modules
COPY --from=build /home/app/.nest .nest
COPY --from=build /home/app/.nuxt .nuxt
COPY package.json package.json
COPY nuxt.config.js nuxt.config.js
CMD ["yarn", "start"]