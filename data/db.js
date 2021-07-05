  
var MongoClient = require("mongodb").MongoClient;
require('dotenv').config();
var url = process.env.MONGODB_URI;
var dbname='test' 

MongoClient.connect(url,{ useNewUrlParser: true })
    .then(client => {
     const db = client.db('test');
     const collection = db.collection('Contact_Info');
     app.locals.collection = collection;
}).catch(error=>console.log("couldn't connect"));
   




     
     
