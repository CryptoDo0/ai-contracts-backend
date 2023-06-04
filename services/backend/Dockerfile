# ---------------------------------------
# Development stage
# ---------------------------------------
FROM node:16 AS development
WORKDIR /node

COPY package*.json tsconfig.json ./

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install

WORKDIR /node/app/flatten/solidity-flattener
RUN npm install

WORKDIR /node/app

CMD ["npm", "run", "start:dev"]

# ---------------------------------------
# Production stage
# ---------------------------------------
FROM node:16 AS production

WORKDIR /node/app/flatten/solidity-flattener
RUN npm install

WORKDIR /node

COPY package*.json tsconfig.json ./

# Default build argument is dev
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]
