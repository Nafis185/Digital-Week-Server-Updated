const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser')

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middlewqare

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rcodyjf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const eventsCollection = client.db("DigitalWeek").collection("Events");
    const registerCollection = client.db("DigitalWeek").collection("Registers");

    // jwt auth related api
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log(user);
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false,
        })
        .send({ success: true });
    });

    // events related api
    app.get("/Events", async (req, res) => {
      const cursor = eventsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/events/:id", async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) };

      const options = {
        // Include only the `title` and `imdb` fields in the returned document
        projection: { title: 1, price: 1, service_id: 1, img: 1 },
      };

      const result = await eventsCollection.findOne(query, options);
      res.send(result);
    });

    // registers creates
    app.get("/Registers", async (req, res) => {
      console.log(req.query.email);
      console.log("tok tok token ", req.cookies.token );
      let query = {};
      if (req.query?.email) {
        query = { email: req.query.email };
      }
      const result = await registerCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/Registers", async (req, res) => {
      const register = req.body;
      console.log(register);
      const result = await registerCollection.insertOne(register);
      res.send(result);
    });

    app.patch("/Registers/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const updatedRegister = req.body;
      console.log(updatedRegister);

      const updateDoc = {
        $set: {
          status: updatedRegister.status,
        },
      };
      const result = await registerCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.delete("/Registers/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await registerCollection.deleteOne(query);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
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
  res.send("digital week running");
});

app.listen(port, () => {
  console.log(`digital week running on port ${port}`);
});
