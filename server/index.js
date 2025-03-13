require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// middleware

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://estatevista-7e230.web.app",
  ],
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

// verify user token

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "unauthorized access" });
  }
  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "forbidden access" });
    }
    req.decoded = decoded;

    next();
  });
};

// verify a user admin or not
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.koweo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const db = client.db("estateVista");
    const propertiesCollection = db.collection("properties");
    const usersCollection = db.collection("users");
    const wishlistCollection = db.collection("wishlist");
    const reviewCollection = db.collection("reviews");
    const offerCollection = db.collection("offer");
    const fraudCollection = db.collection("fraud");
    const paymentCollection = db.collection("payment");

    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;

      const query = { email };
      const user = await usersCollection.findOne(query);
      const isAdmin = user?.role == "admin";

      if (!isAdmin) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };

    // verify a user agent or not

    const verifyAgent = async (req, res, next) => {
      const email = req.decoded.email;

      const query = { email };
      const user = await usersCollection.findOne(query);
      const isAgent = user?.role == "agent";

      if (!isAgent) {
        return res.status(403).send({ message: "forbidden access" });
      }
      next();
    };
    // JWT API

    app.post("/jwt", (req, res) => {
      const user = req.body;
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "365d",
      });
      res.send({ token });
    });

    /*  save or update a user api */

    //  profile api

    app.get("/user/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    app.get("/users", verifyToken, verifyAdmin, async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    app.post("/users/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const user = req.body;

      // check if user exists user in db

      const isExist = await usersCollection.findOne(query);
      if (isExist) {
        return res.send(isExist);
      }
      const result = await usersCollection.insertOne({
        ...user,
        role: "customer",
        timestamp: Date.now(),
      });
      res.send(result);
    });

    app.patch("/users/:userId", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.userId;

      const { role } = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateRole = { $set: { role } };
      const result = await usersCollection.updateOne(filter, updateRole);
      res.send(result);
    });

    app.delete("/users/:userId", verifyToken, verifyAdmin, async (req, res) => {
      const id = req.params.userId;
      const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.delete(
      "/fraud-users/:userEmail",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const userEmail = req.params.userEmail;
        const query = { "agent.email": userEmail };

        const deleteProperty = await propertiesCollection.deleteMany(query);

        const fraudEmail = await fraudCollection.insertOne({
          email: userEmail,
        });
        const filter = { email: userEmail };
        const updateDoc = { $set: { role: "fraud" } };
        const updateRole = await usersCollection.updateOne(filter, updateDoc);
        res.send({ deleteProperty, fraudEmail, updateRole });
      }
    );

    /* all properties api */

    app.get("/allProperties", async (req, res) => {
      const { status, search, sort } = req.query;
      let filter = {};

      if (status) {
        filter.status = status;
      }

      if (search) {
        filter.propertyLocation = { $regex: search, $options: "i" };
      }

      let sortOption = {};
      if (sort === "asc") {
        sortOption["priceRange.minRange"] = 1;
      } else if (sort === "dsc") {
        sortOption["priceRange.minRange"] = -1;
      }

      const properties = await propertiesCollection
        .find(filter)
        .sort(sortOption)
        .toArray();

      res.send(properties);
    });
    // latest advertise

    app.get("/advertised-properties", async (req, res) => {
      const result = await propertiesCollection
        .find()
        .sort({ _id: -1 })
        .limit(4)
        .toArray();
      res.send(result);
    });
    // advertise property
    app.put(
      "/advertise-property/:id",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        try {
          const { id } = req.params;
          const filter = { _id: new ObjectId(id) };
          const updateDoc = { $set: { advertised: true } };
          const options = { upsert: true };

          const result = await propertiesCollection.updateOne(
            filter,
            updateDoc,
            options
          );
          res.send(result);
        } catch (error) {
          res
            .status(500)
            .send({ error: "Failed to update advertisement status" });
        }
      }
    );

    app.get(
      "/properties/:email",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const email = req.params.email;
        const query = { "agent.email": email };

        const result = await propertiesCollection.find(query).toArray();
        res.send(result);
      }
    );

    app.delete("/property/:id", verifyToken, verifyAgent, async (req, res) => {
      const id = req.params.id;
      const result = await propertiesCollection.deleteOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    });

    app.patch("/property/:id", verifyToken, verifyAgent, async (req, res) => {
      const id = req.params.id;
      const updatedProperty = req.body;
      const filter = { _id: new ObjectId(id) };
      const updateDoc = { $set: updatedProperty };
      const result = await propertiesCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    /* Verify status api */
    app.patch(
      "/verify-property/:propertyId",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.propertyId;

        const filter = { _id: new ObjectId(id) };
        const updateVerify = { $set: { status: "accepted" } };
        const result = await propertiesCollection.updateOne(
          filter,
          updateVerify
        );
        res.send(result);
      }
    );

    /* reject status api */

    app.patch(
      "/reject-property/:propertyId",
      verifyToken,
      verifyAdmin,
      async (req, res) => {
        const id = req.params.propertyId;

        const filter = { _id: new ObjectId(id) };
        const updateReject = { $set: { status: "rejected" } };
        const result = await propertiesCollection.updateOne(
          filter,
          updateReject
        );
        res.send(result);
      }
    );

    // get the data for sold properties section from offerCollection

    app.get(
      "/sold-properties/:agentEmail",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const agentEmail = req.params.agentEmail;

        const result = await offerCollection
          .find(
            {
              "property.agent.email": agentEmail,
              status: "bought",
            },
            {
              projection: {
                _id: 0,
                title: "$property.propertyTitle",
                location: "$property.propertyLocation",
                buyerEmail: "$email",
                buyerName: "$name",
                soldPrice: "$offerAmount",
                transactionId: "$transactionId",
              },
            }
          )
          .toArray();

        res.send(result);
      }
    );

    /* add Property post api */
    app.post("/add-property", verifyToken, verifyAgent, async (req, res) => {
      const property = req.body;
      const email = req.body.agent.email;

      // Check if the specific agent is marked as fraud
      const query = { email: email, role: "fraud" };
      const verifyFraud = await usersCollection.findOne(query);

      if (verifyFraud) {
        return res
          .status(400)
          .send({ message: "You are marked as fraud. Cannot add properties." });
      }

      const result = await propertiesCollection.insertOne(property);
      res.send(result);
    });
    /* specific property api */

    app.get("/property/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await propertiesCollection.findOne(query);

      res.send(result);
    });

    // reviews related api

    // get latest properties review

    app.get("/latest-reviews", async (req, res) => {
      const result = await reviewCollection
        .find()
        .sort({ _id: -1 })
        .limit(4)
        .toArray();
      res.send(result);
    });

    // get all properties review
    app.get("/reviews", verifyToken, verifyAdmin, async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
    });

    // Get all reviews for a specific property
    app.get("/reviews/:propertyId", verifyToken, async (req, res) => {
      const propertyId = req.params.propertyId;
      const query = { propertyId: new ObjectId(propertyId) };
      const reviews = await reviewCollection.find(query).toArray();
      res.send(reviews);
    });

    // Add a review for a specific property
    app.post("/reviews/:propertyId", verifyToken, async (req, res) => {
      const { rating, comment, name, email, image, propertyTitle } = req.body;
      const propertyId = req.params.propertyId;

      // Validate property existence
      const property = await propertiesCollection.findOne({
        _id: new ObjectId(propertyId),
      });
      if (!property) {
        return res.status(404).send({ error: "Property not found" });
      }
      console.log(property);

      const review = {
        propertyId: new ObjectId(propertyId),
        name,
        image,
        email,
        rating,
        comment,
        propertyTitle,
        createdAt: new Date(),
      };

      const result = await reviewCollection.insertOne(review);
      console.log(result);
      res.send({ message: "Review added successfully", result });
    });

    // delete reviews
    app.delete("/reviews/:reviewId", verifyToken, async (req, res) => {
      const reviewId = req.params.reviewId;
      const query = { _id: new ObjectId(reviewId) };
      const result = await reviewCollection.deleteOne(query);

      if (result.deletedCount === 0) {
        return res.status(404).send({ error: "Review not found" });
      }

      res.send({ message: "Review deleted successfully", result });
    });

    // get my reviews
    app.get("/my-reviews", async (req, res) => {
      const { email } = req.query;
      if (!email) {
        return res.status(400).send({ error: "Email is required." });
      }

      const reviews = await reviewCollection.find({ email }).toArray();

      res.send(reviews);
    });
    // wishlist related api

    app.post("/wishlist", verifyToken, async (req, res) => {
      const { name, email, propertyId } = req.body;

      if (!email || !propertyId) {
        return res
          .status(400)
          .json({ error: "Email and Property ID are required." });
      }

      try {
        // Check if property already exists in the wishlist
        const existingWishlistItem = await wishlistCollection.findOne({
          email: email,
          propertyId: new ObjectId(propertyId),
        });

        if (existingWishlistItem) {
          return res
            .status(400)
            .send({ error: "This property is already in your wishlist." });
        }

        const wishlistItem = {
          name,
          email,
          propertyId: new ObjectId(propertyId),
          addedAt: new Date(),
        };

        const result = await wishlistCollection.insertOne(wishlistItem);
        res.send({ message: "Property added to wishlist!", result });
      } catch (error) {
        res.status(500).send({ error: "Failed to add property to wishlist." });
      }
    });

    app.get("/wishlist/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      try {
        const wishlist = await wishlistCollection
          .aggregate([
            { $match: { email } },
            {
              $lookup: {
                from: "properties",
                localField: "propertyId",
                foreignField: "_id",
                as: "propertyDetails",
              },
            },
            { $unwind: "$propertyDetails" },
          ])
          .toArray();

        res.send(wishlist);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    });

    app.delete(
      "/wishlist/:email/:propertyId",
      verifyToken,
      async (req, res) => {
        const { email, propertyId } = req.params;
        try {
          const deletedItem = await wishlistCollection.deleteOne({
            email,
            propertyId: new ObjectId(propertyId),
          });

          res.status(200).send({ message: "Property removed from wishlist." });
        } catch (error) {
          res
            .status(500)
            .send({ error: "Failed to remove property from wishlist." });
        }
      }
    );

    // offer collection api

    app.post("/make-offer", verifyToken, async (req, res) => {
      const offer = req.body;

      // Insert the offer into the database
      const result = await offerCollection.insertOne(offer);
      res.send(result);
    });
    app.get("/offer/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };

      const result = await offerCollection.findOne(query);
      res.send(result);
    });

    app.get("/all-offer", async (req, res) => {
      const result = await offerCollection.find().toArray();
      res.send(result);
    });

    app.get(
      "/req-property/:email",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const email = req.params.email;
        const query = { "property.agent.email": email };
        const result = await offerCollection.find(query).toArray();
        res.send(result);
      }
    );

    app.patch(
      "/req-property/:offerId",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const offerId = req.params.offerId;
        const propertyId = req.body.propertyId;

        const filter = { "property._id": propertyId };
        const updateDoc = { $set: { status: "rejected" } };
        const result = await offerCollection.updateMany(filter, updateDoc);

        const filter2 = { _id: new ObjectId(offerId) };
        const acceptUpdateDoc = { $set: { status: "accepted" } };
        const acceptStatus = await offerCollection.updateOne(
          filter2,
          acceptUpdateDoc
        );
        res.send(acceptStatus);
      }
    );

    app.patch(
      "/rej-property/:offerId",
      verifyToken,
      verifyAgent,
      async (req, res) => {
        const offerId = req.params.offerId;
        const filter = { _id: new ObjectId(offerId) };
        const updateDoc = { $set: { status: "rejected" } };
        const result = await offerCollection.updateOne(filter, updateDoc);
        res.send(result);
      }
    );

    // payment intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { price } = req.body;
      const amount = parseInt(price * 100);
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.get("/payments/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await paymentCollection.find(query).toArray();
      res.send(result);
    });

    app.post("/payments", verifyToken, async (req, res) => {
      const payment = req.body;
      const { offerIds, transactionId } = payment; // Get offerIds and transactionId from request body

      // Insert payment record
      const paymentResult = await paymentCollection.insertOne(payment);

      // Update the offer status to "bought" in offerCollection
      const query = { _id: new ObjectId(offerIds) };
      const updateDoc = {
        $set: { status: "bought", transactionId: transactionId },
      };

      const updateResult = await offerCollection.updateOne(query, updateDoc);

      res.send({ paymentResult, updateResult });
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
  res.send("EstateVista was Selling Property....");
});

app.listen(port, () => {
  console.log(`EstateVista is running on the port : ${port}`);
});
