FROM node:16.15.1
WORKDIR /home/piano-app
COPY . .
RUN npm install
CMD ["npm", "start"]
