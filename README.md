athena
======

An MQTT Recoding and presentation app written in node.js

The idea of athena is fairly simple. It subscribes to an MQTT topic,
then whenever a message is published to that topic or any sub-topics
it will be stored in a MongoDB collection.

You can then query the Web frontend or the REST interface for the topics
that have been recorded and the latest data published to them.

The driving idea behind this is to have a way to nicely present MQTT
 sensor data without having to wait for it on the client end.
 The server handles
recording and storing it and then the client just has to query for
 what is available.

## To Do
- [x] Read in settings.js file
- [x] Subscribe to master topic
- [x] Create suitable objects with messages arrive
- [x] Change athena.js to use settings.json instead of settings.js
- [x] Store said objects in MongoDb Collection
- [x] Store a record for topics in separate Collection
- [ ] Build REST API to collect this information
- [ ] Build Query framework to make getting averages and records within a certain time frame easier
- [ ] Add Cron Engine to delete data after x days if needed
- [ ] Build UI using Angular.js, and maybe D3

## Installation

Currently: Clone the repository, run `npm install --production`

## Running

To run, simply enter the directory and run `node athena.js`

## Settings file
This is the current spec for the settings file. It should be called settings.json and live in the root of the app.
**Note:** The // comments below will not work in the real settings file, make sure you don't include them.

```
{
  // The MQTT Broker Detailsmark
  "mqttBrokerHost"  : "localhost",
  "mqttBrokerPort"  : 1883,
  "mqttBrokerUser"  : null,
  "mqttBrokerPass"  : null,

  // This is the root topic athena will subscribe to.
  // the # is important so that it subscribes to all child topics.
  "mqttBrokerTopic" : "/home/#",

  // The Mongo DB Details
  "mongoDbHost"     : "localhost",
  "mongoDbPort"     : 27017,

  // Verbose, set to true to get more debug info.
  "verbose"         : true
}

```

## REST API Specification

|      URI     |         Function         |   Example   |          Status          |
|--------------|--------------------------|-------------|--------------------------|
| /api/topics  | Returns a list of topics | /api/topics | :heavy_multiplication_x: |
| /api/records/? | Returns records for a topic | TODO | :heavy_multiplication_x: |
