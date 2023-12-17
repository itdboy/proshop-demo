import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js"; 
//@route Get /api/orders
//@access private
const addOrderItems = asyncHandler(async (req, res) => {

 
  const { 
    orderItems,
    shippingAddress,
    paymentMethod,
    paymentResult,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
    paidAt,
    isDelivered,
    deliveredAt,
  } = req.body;

 

  // ถ้ามี orderItems แต่ตัวแปร empty ก็คือยังไม่มี order
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      isPaid,
      paidAt,
      isDelivered,
      deliveredAt,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//@desc get logged in user orders
//@route Get /api/orders/myorders
//@access private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

//@desc get order by ID
//@route Get /api/orders/:id
//@access private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//@desc update order to paid
//@route Get /api/orders/:id/pay
//@access private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("update order to paid");
});

//@desc update order to delivery
//@route Get /api/orders/:id/deliver
//@access PrivateAdmin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("update order to deliver");
});

//@desc get all orders
//@route Get /api/orders
//@access PrivateAdmin
const getOrders = asyncHandler(async (req, res) => {
  res.send("get all orders");
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
