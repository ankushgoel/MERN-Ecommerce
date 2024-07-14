import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length == 0) {
    res.status(400);
    throw new Error('No items in order');
  } else {
    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined,
      })),
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc    Get orders of a user
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

// @desc    Get order by id
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (order) {
    res.json(order);
  } else {
    // res.status(401);
    // throw new Error('Invalid orderId!');
    res.status(404);
    throw new Error('Order Not Found!');
  }
});

// @desc    Update order to delivered
// @route   PUT /api/orders/:id/pay
// @access  Private/Admin
const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send('update order');
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send('update order');
});

// @desc    Get all orders
// @route   GET /api/orders/
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  res.send('get all orders');
});

export {
  getAllOrders,
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
};
