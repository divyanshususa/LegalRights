const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const connectDB = require("./Config");
const authenticateToken = require("./Util/authMiddleware");

const saleMainDocumentRoutes = require("./routes/saleMainDocumentRoutes");
const SignupRoute = require("./Routes/Signup");
const login = require("./Routes/Login"); 
const postRoutes = require("./Routes/Post");
const fileRoutes = require("./Routes/fileRoutes");
const templateRouter = require("./Routes/Template");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Configure CORS with specific settings
const corsOptions = {
  origin: "http://localhost:3000", // The frontend URL
  credentials: true, // Enable credentials
};
app.use(cors(corsOptions));

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
app.use("/api/sale-main-documents", authenticateToken, saleMainDocumentRoutes);
app.use("/user", SignupRoute);
// app.use("/getuser", authenticateToken, SignupRoute);
app.use("/api", templateRouter);
app.use("/login", login);
app.use("/api", postRoutes);
app.use("/files", fileRoutes);

app.get("/api/get-document", (req, res) => {
  res.contentType("application/pdf");
  res.sendFile("path_to_output.pdf");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
