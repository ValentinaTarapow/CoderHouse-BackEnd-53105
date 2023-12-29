import express, { json } from "express";

import ProductsManager from "./data/fs/products.fs.js";
import UsersManager from "./data/fs/users.fs.js";

const app = express();

const PORT = 8080;

app.listen(PORT, () => console.log("Server running on port " + PORT));

app.use(json());

app.get("/api/products", async (req, res) => {
  try {
    const products = await ProductsManager.readFile();

    if (!products.length)
      return res.json({
        statusCode: 404,
        success: false,
        message: "Products not found",
      });

    res.json({
      statusCode: 200,
      success: true,
      response: products,
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: error,
    });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await ProductsManager.readOne(id);

    if (!Object.keys(product).length)
      return res.json({
        statusCode: 404,
        success: false,
        message: "Product not found",
      });

    res.json({
      statusCode: 200,
      success: true,
      response: product,
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: error,
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await UsersManager.readFile();

    if (!users.length)
      return res.json({
        statusCode: 404,
        success: false,
        message: "Users not found",
      });

    res.json({
      statusCode: 200,
      success: true,
      response: users,
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: error,
    });
  }
});

app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UsersManager.readOne(id);

    if (!Object.keys(user).length)
      return res.json({
        statusCode: 404,
        success: false,
        message: "User not found",
      });

    res.json({
      statusCode: 200,
      success: true,
      response: user,
    });
  } catch (error) {
    res.json({
      statusCode: 500,
      message: error,
    });
  }
});