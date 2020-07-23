const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

mongoClient.connect( url, ( err, client ) =>{
    assert.equal( err, null );

    console.log('Connected successfully to MongoDB server!');;

    const db = client.db( dbname );
    const collection = db.collection("dishes");

    collection.insertOne({ "name": "Uthappizza", "description": "test record"}, (err, result) =>{
        assert.equal( err, null );

        console.log("After Insert: \n");
        console.log( result.ops );

        collection.find({}).toArray( (err, docs ) =>{
            assert.equal( err, null );

            console.log("Found:\n");
            console.log( docs );

            db.dropCollection("dishes", (err, result) =>{
                console.log( ">>>>>>>>", err );
                assert.equal( err, null );

                client.close();
            });
        });
    });

});