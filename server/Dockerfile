FROM node:16.13.2 AS builder

WORKDIR /usr/src/app

COPY . .

RUN yarn install


# RUN npm run build

# FROM node:lts

# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/dist ./dist
EXPOSE 4200
CMD [ "yarn", "start" ]