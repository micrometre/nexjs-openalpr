# Base on offical Node.js Alpine image
FROM node:alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally

COPY ./package*.json ./

# Install dependencies
RUN yarn

# Copy all files
COPY ./ ./

RUN yarn build

# Expose the listening port
EXPOSE 3000
CMD yarn start

