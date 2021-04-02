
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const app = express()
app.use(bodyParser.json())
app.use(cors());
const port = 5000



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xcxqb.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    const collection = client.db("itShop").collection("product");
    const addCollection = client.db("itShop").collection("addid");

    app.post('/product', (req, res) => {
        const newproduct = req.body;
        collection.insertOne(newproduct)
            .then(result => {
                res.send(result.insertedCount > 1)
                //  console.log(req.body);
            })

    })


    app.get('/products', (req, res) => {

        collection.find({})
            .toArray((err, result) => {
                res.send(result)
            })

    })

    app.get('/ordes', (req, res) => {

        addCollection.find({})
            .toArray((err, result) => {
                res.send(result)
            })

    })

    app.get('/ordes', (req, res) => {
        // console.log(req.query.email)

        addCollection.find({email:req.query.email})
            .toArray((err, result) => {
                res.send(result)
            })

    })
    

    app.get('/products/:name', (req, res) => {

        collection.find({ name: req.params.name })
            .toArray((err, document) => {
                res.send(document);
            })
    })

    app.post('/orders', (req, res) => {
        const addOrfer = req.body;
        addCollection.insertOne(addOrfer)
            .then(result => {
                res.send(result.insertedCount > 0)
                // console.log(req.body);
            })
    })

    app.delete("/deleteEvent/:id",(req,res)=>{
        console.log(req.params.id)
        collection.deleteOne({_id: ObjectId(req.params.id)})
        .then(result=>{
          
            console.log(result)
        })
    })

   

    

    app.get('/', (req, res) => {
        res.send('Hello World!')
    })


})

app.listen( process.env.PORT ||  port)

