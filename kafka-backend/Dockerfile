FROM kafka_2.11-1.1.0

RUN mkdir -p /Users/anjanamenon/kafka-dir
WORKDIR /Users/anjanamenon/kafka-dir

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
