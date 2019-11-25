<h1>Steps to run the application</h1>

1.  Install node.js, python3, install JDK 8

2. Verify that both are installed by running ```node -v``` and ```python3 --version```. Set JAVA_HOME and your bash profile and confirm it by ```echo $JAVA_HOME```

3. Go inside Backend, Frontend, and kafka-backend and run ```npm start``` in each case

4. a) Go inside PythonBackend and run ```python3 klien-server.py```

   b) You will get an error such as ```klien is missing```

   c) Run ```pip3 install <name_of_the_package>``` till all such errors are resolved. Once you see the server starting, kill the server by Ctrl + C. For example, ```pip3 install klien```.

5. a) Unzip ```kafka_2.11-1.1.0.zip``` and ```cd``` to kafka_2.11-1.1.0

   b) Inside kafka_2.11-1.1.0 run ```bin/zookeeper-server-start.sh config/zookeeper.properties```

   c) Open another terminal window and ```cd``` to kafka_2.11-1.1.0. When inside, run ```bin/kafka-server-start.sh config/server.properties```

   d) Open another terminal window and ```cd``` to kafka_2.11-1.1.0. When inside, run

   ```
   bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic access
   bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic chat
   bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic order
   bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic post_book
   bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic response_topics```
   ```

   e) Verify that these five topics have been created by running ```bin/kafka-topics.sh --list --zookeeper localhost:2181```

6. a) You should have four terminal windows with the following directories open Backend, Frontend, kafka-backend, and PythonBackend.

   b) In PythonBackend terminal, run ```python3 klien-server.py```.  In the other three terminals run, ```npm start```.

   c) In you browser, go to http://localhost:3000/
