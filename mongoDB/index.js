const express = require("express");
const productsRoute = require("./src/routes/v2/products");
const { mongoConnect } = require("./src/config/dbConfig");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.json());
app.use("/productsRoute", productsRoute);
app.use("/products", productsRoute);

app.get("/", (req, res) => {
  res.render("create");
});

app.listen(8000, () => {
  mongoConnect();
});





// const express = require("express");
// const { mysqlConnect } = require("./src/config/dbConfig");
// const productsRoute = require("./src/routes/v2/products");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
// app.set("view engine", "ejs");
// app.use(express.json());
// app.use("/productsRoute", productsRoute);
// app.use("/products", productsRoute);

// app.get("/", (req, res) => {
//   res.render("create");
// });


// app.listen(3306, async () => {
//   await mysqlConnect();
//   console.log("Server started on port 3306");
// });

