import express from "express";
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from "../controllers/orderController.js";

import { protect, admin } from "../middleware/authMiddleware.js";

//ถ้าเข้ามาที่ /order แล้วมี / ถ้าเป็น post จะมาที่ addOrderItems โดยจะเช็ค middleware ว่าเป็น user ก่อนหรือเปล่า
//ถ้าเข้ามาที่ /order แล้วมี / ถ้าเป็น get จะมาที่ getOrders โดยจะเช็ค middleware ว่าเป็น user และ admin ก่อนหรือเปล่า
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/mine").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

export default router;
