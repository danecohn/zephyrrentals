FROM node:24-alpine
WORKDIR /app
COPY package.json server.mjs booking.mjs ./
COPY scripts/build.mjs scripts/render.mjs ./scripts/
COPY data ./data
COPY public ./public
RUN node scripts/build.mjs
ENV NODE_ENV=production PORT=8080
USER node
EXPOSE 8080
CMD ["node","server.mjs"]
