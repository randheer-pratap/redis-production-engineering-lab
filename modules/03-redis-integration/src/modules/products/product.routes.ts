import { Router } from "express";
import { ProductService } from "./product.service";

const router = Router();
const productService = new ProductService();

router.get("/:id", async (req, res, next) => {
  try {
    const product = await productService.getProduct(
      req.params.id,
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router;