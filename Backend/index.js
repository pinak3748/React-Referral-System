const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const { register, login, me, logout } = require('./controller/auth')
const { register_validation, login_validation } = require('./middleware/authValidation')
const auth = require("./middleware/auth");
// Initiate Mongo Server
InitiateMongoServer();

const app = express();
const cors = require('cors')
app.use(cors({credentials:true, origin: '*'}))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// PORT
const PORT = process.env.PORT || 4000;
app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.post('/register',register_validation,register);
app.post('/login',login_validation,login);
app.get('/logout',logout);
app.get('/user',auth,me);


