FROM node:latest
WORKDIR /var/www
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Disable Husky https://typicode.github.io/husky/#/?id=disable-husky-in-cidocker
RUN npm set-script prepare ""

RUN npm install

# Bundle app source
COPY . .
RUN npm run build

EXPOSE 3000
CMD node server.js