const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

// Importation du routeur
const indexRouter = require('./routes/index');



// Setting up template engine
app.set("view engine", "ejs");

// Middlewares configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotenv.config();
app.use(express.json(), indexRouter.routes);
app.use(cors());
app.use(express.static('public'));

// Déclaration des routes qui commencent par `/`
app.use('/', indexRouter.routes);
app.use('/portfolio', indexRouter.routes);
app.use('/contact', indexRouter.routes);


// Pages 404 - ERROR
app.use((req, res) => {
  res.render("pages/error404")
});


app.listen(3000, () => {
  console.log(`server is running`, "http://localhost:3000");
});

