import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';    
import getRandomResponse from "./randomjson.js";

const app = express();
const PORT = 3000;

// Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// Route to render the landing page
app.get("/", (req, res) => {
  res.render("index"); // Render 'views/index.ejs'
});

// Route to handle form submission
app.post("/submit", async (req, res) => {
  const userPost = req.body.post;
  console.log(userPost);

  if (!userPost || userPost.trim() === "") {
    return res.render("index", {
      error: "Post cannot be empty!",
      analysis: null,
    });
  }

  const mlResponse=getRandomResponse()
    // Simulated ML API call (replace with your actual ML API endpoint)
    // const mlApiUrl = "http://example-ml-api.com/analyze";
    
    // const mlResponse = await axios.post(mlApiUrl, { text: userPost });
console.log(mlResponse)

    const analysis = mlResponse.analysis; // Extract analysis result from API
    res.render("index", { error: null, analysis });
 
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
