import express from "express";
import bodyParser from "body-parser";
import {
  getCategories,
  getProducts,
  getCateroyWiseProduct,
  getSingleProduct,
  searchResults,
} from "./database.js";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/products", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

app.get("/api/categories", async (req, res) => {
  const category = await getCategories();
  res.send(category);
});

app.get("/api/CategoryWiseData/:id", async (req, res) => {
  const categoryId = req.params.id;
  const categoryProducts = await getCateroyWiseProduct(categoryId);
  res.send(categoryProducts);
});

app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  const singleProducts = await getSingleProduct(productId);
  res.send(singleProducts);
});

app.get("/api/search_results", async (req, res) => {
  const text = req.query.text;
  const results = await searchResults(text);
  res.send(results);
});

app.post("/api/addOrder", (req, res) => {
  const { email, checkoutItem } = req.body;
  console.log(req.body);
  res.send("Order added successfully");
});

app.use((err, req, res, next) => {
  // console.log(err.stack);
  res.status(500).send("!Something Broke");
});

app.listen(8080, () => {
  console.log("Server is Listening on Port 8080");
});
