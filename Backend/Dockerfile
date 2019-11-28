FROM node:12.11.1
  
RUN mkdir -p /Users/anjanamenon/docker-dir
WORKDIR /Users/anjanamenon/docker-dir

COPY . .

RUN npm install

EXPOSE 3001

CMD [ "npm", "start" ]
