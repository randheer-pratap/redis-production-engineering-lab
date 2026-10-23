import express from "express";
import productRoutes from "./modules/products/product.routes";

export const app = express();

app.use(express.json());

app.use("/products", productRoutes);