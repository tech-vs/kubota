

FROM node:alpine

# Set working directory
WORKDIR /usr/app


# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
# Copy all files
COPY ./ ./
# Install dependencies
RUN yarn install



# Build app
RUN yarn build

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
USER node

# Launch app with PM2
CMD [ "yarn", "start"]