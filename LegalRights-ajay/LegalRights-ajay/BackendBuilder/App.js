const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./Config");
const authenticateToken = require("./Util/authMiddleware");
const template = require("./Routes/Templates")

const SignupRoute = require("./Routes/Signup");
const login = require("./Routes/Login"); 
const postRoutes = require("./Routes/Post");
const DataEntryRoutes= require("./Routes/DataEntryRoutes")

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Configure CORS with specific settings
const corsOptions = {
  origin: ["http://localhost:3000",'*'], // The frontend URL
  credentials: true, // Enable credentials
};
app.use(cors());

// Database connection
connectDB()
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("MongoDB Atlas connection error:", error);
    process.exit(1);
  });

// Routes

app.use("/user", SignupRoute);

app.use("/login", login);
app.use("/api", postRoutes);

app.use("/templates",template)

app.use('/data-entry',DataEntryRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
