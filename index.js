const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const cors = require("cors");
const graphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./Schema/schema");

const PORT = 3000;

// Enable env variable
const dotenv = require("dotenv");
dotenv.config();

// Connect to mongodb
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

// // Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.use(
  "/graphql",
  graphqlHTTP({
    //directing express-graphql to use this schema to map out the graph
    schema,
    //directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true,
  })
);

app.listen(PORT, async () => {
  console.log("Server is up and running");
});
