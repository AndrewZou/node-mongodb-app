const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbaccessor = require('./dbaccessor');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

mongoClient.connect( url)
.then( client  =>{
    console.log('Connected successfully to MongoDB server!');;

    const db = client.db( dbname );
    const collection = db.collection("dishes");

    dbaccessor.insertDocument(db, { name: "Vadonut", description: "Test"}, "dishes")
    .then( result => {
        console.log("Insert Document:\n", result.ops);

        return dbaccessor.findDocuments(db, "dishes");
    })
    .then( docs => {
        console.log("Found Documents:\n", docs);
        return dbaccessor.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes");
    })
    .then( result => {
        console.log("Updated Document:\n", result.result);
        return dbaccessor.findDocuments(db, "dishes");
    })
    .then( docs => {
        console.log("Found Updated Documents:\n", docs);                            
        return db.dropCollection("dishes");
    })
    .then( result => {
        console.log("Dropped Collection: ", result);
        return client.close();
    })
    .catch( err => console.log(err));
}).
catch( err => console.log(err));