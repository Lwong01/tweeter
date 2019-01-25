"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

MongoClient.connect(MONGODB_URI, step2);

function step2(err, db){
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }

  // We have a connection to the "tweeter" db, starting here.
  console.log(`Connected to mongodb: ${MONGODB_URI}`);

  // ==> Refactored and wrapped as new, tweet-specific function:

  function getTweets(callback) {
    db.collection("tweets").find().toArray(callback);
  }

  // ==> Later it can be invoked. Remember even if you pass
  //     `getTweets` to another scope, it still has closure over
  //     `db`, so it will still work. Yay!

  getTweets(step3);

  function step3(err, tweets){
    if (err) throw err;

    console.log("Logging each tweet:");
    for (let tweet of tweets) {
      console.log(tweet);
    }

    db.close();
  }


}
// (async () => {
//   const db = await MongoClient.connect(MONGODB_URI);
//   console.log(`Connected to mongodb: ${MONGODB_URI}`);

//   const tweets = await db.collection('tweets').find().toArray();

//   console.log("Logging each tweet:");
//   for (let tweet of tweets) {
//     console.log(tweet);
//   }

//   db.close();
// })();
// STEP 1: Attempt to connect to database

// STEP 2: Accept connection, use it to start a query. It will find the collection of data from tweets, turn that into an array, pass it in to a callback.

// STEP 3: The data that is passed into the callback is passed into step3's params. If error, then throw err, if not, then consolelog each data out. Print out each member of a query.