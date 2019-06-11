const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

//Routes Imports
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Initializing Application
const app = express();
// Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
require('dotenv').config();


//=================================
//         MONGODB CONNECTION
//=================================

mongoose
  .connect(process.env.MONGODB_URI || process.env.mongodb_uri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

  
//=================================
//         SERVE UP STATIC ASSEST
//=================================
if(process.env.MODE_ENV === 'production'){
  app.use(express.static("client/build"));
}

// Passport midleware
app.use(passport.initialize());
require("./middleware/passport")(passport);

// Use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 100;

app.listen(port, () => console.log(`Server is running on port ${port}`));
