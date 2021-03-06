# Start with the LTS release of Node
FROM node:argon

# Create and use app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Install type annotations
COPY typings.json /usr/src/app/
RUN node_modules/.bin/typings install

# Put the TypeScript source and specs in place
COPY *.ts tsconfig.json /usr/src/app/
COPY spec /usr/src/app/spec

# Compile
RUN node_modules/.bin/tsc

# Lint
COPY tslint.json /usr/src/app/
RUN node_modules/.bin/tslint *.ts spec/*.ts

# Unit test
RUN node_modules/.bin/jasmine

# Port it listens on
EXPOSE 8080

# Have npm run the command defined in the package.json to start the app
CMD [ "npm", "start" ]
