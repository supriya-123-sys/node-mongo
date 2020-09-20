const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper=require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {

    assert.equal(err,null);

    console.log('Connected correctly to server');

    const db = client.db(dbname);
    dboper.insertDocument(db,{ name: "Vadonut", description:" Test"},'dishes',(result)=>{
        console.log('insert document:\n', result.ops);
        dboper.findDocuments(db,'dishes',(docs)=>{
            console.log('Found Documents:\n', docs);
            dboper.updateDocument(db,{name:'Vadonut'},{description:'Updated test'},'dishes',(result)=>{
               console.log('updated document :\n', result.result);
               dboper.findDocuments(db,'dishes', (docs)=>{
                   console.log('found updated document: \n',docs);
                   db.dropCollection('dishes',(result)=>{
                       console.log('dropped collection:',result);
                       client.close();
                   })
               }) 
            })
        })
    })

});