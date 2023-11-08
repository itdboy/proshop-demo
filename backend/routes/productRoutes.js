import express from "express";
const router = express.Router();

import { getProducts, getProductById } from "../controllers/productController.js";

// import products from "../data/products.js";

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);


//router.get("/", getProducts); 
//router.get("/:id", getProductById);

export default router;
