require("dotenv").config();
const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");

const port = process.env.PORT || 3000;

const corsOptions = {
   origin: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.efhcwjr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
   serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
   },
});


async function run() {
   try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection



      const reviewsCollection = client
         .db("portfolioDB")
         .collection("review");


      app.get('/reviews', async (req, res) => {
         const result = await reviewsCollection.find().toArray()
         res.send(result)

      })

      await client.db("admin").command({ ping: 1 });
      console.log(
         "Pinged your deployment. You successfully connected to MongoDB!"
      );
   } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
   }
}



run().catch(console.dir);

app.get("/", (req, res) => {
   res.send("Classic Mart Server Site Running");
});

app.listen(port, () => {
   console.log(`Server Running On PORT ${port}`);
});