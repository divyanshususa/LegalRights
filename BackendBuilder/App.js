const express = require("express");
const app = express();
const cors = require("cors"); 
const bodyParser = require("body-parser"); // Import body-parser
const PORT = process.env.PORT || 5000;
const saleMainDocumentRoutes = require("./routes/saleMainDocumentRoutes");
const SignupRoute = require("./Routes/Signup")
const login = require("./Routes/Login")
const createpost = require("./Routes/Post")
const fileRoutes = require("./Routes/fileRoutes")

app.use(cors());
app.use(bodyParser.json()); // Add body-parser middleware


const connectDB = require("./Config");
const getFile = require("./Controller/Template");
const createAdmin = require("./Script");
const router = require("./Routes/Template");
const authenticateToken = require("./Util/authMiddleware");
const postRoutes = require("./Routes/Post");
try {
  connectDB()
    .then(() => {
      console.log("Connected to MongoDB Atlas");
    })
    .catch((error) => {
      console.error("MongoDB Atlas connection error:", error);
      process.exit(1);
    }); 
} catch (err) {
  console.log(err);
}
 

app.use("/api/sale-main-documents",authenticateToken, saleMainDocumentRoutes);
// app.get('/template', template)
app.get("/api/get-document", (req, res) => {
  // Set the content type to application/pdf
  res.contentType("application/pdf");

  // Send the PDF file
  res.sendFile("path_to_output.pdf");
});

app.use("/user", SignupRoute);
app.use("/getuser", authenticateToken, SignupRoute);
app.use("/api", router);
app.use("/login", login)
app.use("/api", postRoutes);

app.get("/", (req, resp) => {
  resp.send("Hello World");
});

app.use("/files", fileRoutes);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
 