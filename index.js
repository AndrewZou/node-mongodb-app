const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbaccessor = require('./dbaccessor');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

mongoClient.connect( url, ( err, client ) =>{
    assert.equal( err, null );

    console.log('Connected successfully to MongoDB server!');;

    const db = client.db( dbname );
    const collection = db.collection("dishes");

    dbaccessor.insertDocument(db, { name: "Vadonut", description: "Test"},
        "dishes", (result) => {
            console.log("Insert Document:\n", result.ops);

            dbaccessor.findDocuments(db, "dishes", (docs) => {
                console.log("Found Documents:\n", docs);

                dbaccessor.updateDocument(db, { name: "Vadonut" },
                    { description: "Updated Test" }, "dishes",
                    (result) => {
                        console.log("Updated Document:\n", result.result);

                        dbaccessor.findDocuments(db, "dishes", (docs) => {
                            console.log("Found Updated Documents:\n", docs);
                            
                            db.dropCollection("dishes", (result) => {
                                console.log("Dropped Collection: ", result);

                                client.close();
                            });
                        });
                    });
            });
    });

});