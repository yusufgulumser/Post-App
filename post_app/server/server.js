const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const connectDb = require("./config/db");

dotenv.config();

connectDb();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", require("./routes/userRoutes")); 
app.use("/api/v1/post", require("./routes/postRoutes"));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.white);
});
