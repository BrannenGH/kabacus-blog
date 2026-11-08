# Copyright 2026 Brannen Hall. All rights reserved.

# The site as a container: Next's standalone server on Node, run as the
# unprivileged `node` user on port 3000. Built on Alpine throughout so the
# image optimiser's sharp binary (musl) matches the runtime.

ARG NODE=docker.io/library/node:22-alpine

FROM ${NODE} AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# The public origin for canonical URLs and the sitemap, fixed at build time.
ARG SITE_URL=
RUN SITE_URL="$SITE_URL" npm run build

FROM ${NODE} AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
# .next is the server's writable cache (regenerated pages, optimised images).
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
