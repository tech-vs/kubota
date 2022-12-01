# FROM node:lts as dependencies
# WORKDIR /usr/src/app
# COPY package.json yarn.lock ./
# RUN yarn install --frozen-lockfile

FROM node:16 as builder
WORKDIR /usr/src/app
COPY . .
RUN yarn install --frozen-lockfile
# COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN yarn build

# FROM node:lts as runner
# WORKDIR /usr/src/app
# # If you are using a custom next.config.js file, uncomment this line.
# COPY --from=builder /usr/src/app/next.config.js ./
# COPY --from=builder /usr/src/app/public ./public
# COPY --from=builder /usr/src/app/.next ./.next
# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3000
CMD ["yarn", "start"]


# FROM node:lts-slim
# WORKDIR /usr/src/app
# COPY . .
# RUN yarn install --frozen-lockfile
# # RUN yarn build
# EXPOSE 3000
# CMD ["yarn", "dev"]