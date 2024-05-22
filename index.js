const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;


//middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z7hla77.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        




        const menuCollection = client.db('Bistro-Boss').collection('Menu');
        const reviewsCollection = client.db('Bistro-Boss').collection('Reviews');
        const cartCollection = client.db('Bistro-Boss').collection('Cart');


        app.get('/menu', async(req, res)=>{
            const result= await menuCollection.find().toArray();
            res.send(result)
        })

        app.get('/reviews', async(req, res)=>{
            const result= await reviewsCollection.find().toArray();
            res.send(result)
        })

        app.get('/getFromCart', async(req, res)=>{
            const email = req.query.email;
            const query = {email: email}
            const result= await cartCollection.find(query).toArray();
            res.send(result)
        })


        app.post ('/addToCart',async(req, res)=>{
            const cartItem = req.body;
            const result = await cartCollection. insertOne(cartItem);
            res.send(result);

        })




























        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Boss is coming');
})

app.listen(port, () => {
    console.log(`Bistro boss is coming on ${port} port`)
})


