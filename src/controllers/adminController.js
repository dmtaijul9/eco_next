import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import User from "@/models/user";
import Order from "@/models/order";
import Product from "@/models/product";
import ErrorHandler from "@/utils/errorHandler";

const getDashboardAnalytics = catchAsyncErrors(async (req, res, next) => {
  //INFO: Counting Total Orders
  const ordersCount = await Order.count();
  //INFO: Counting Total Users
  const usersCount = await User.count({ role: "USER" });

  const productsCount = await Product.count();

  const pendingOrdersCount = await Order.count({ order_status: "pending" });

  const newOrders = await Order.find({ is_delivered: false })
    .sort({ createdAt: -1 })
    .limit(10);

  const newUsers = await User.find().sort({ createdAt: -1 }).limit(10);

  const newProducts = await Product.find().sort({ createdAt: -1 }).limit(10);

  const orders = await Order.find();
  //INFO: Counting Total Products Purchased

  const totalProductPurchase = orders
    .map((order) =>
      order.order_items
        .map((item) => item.qty)
        .reduce((total, qty) => (total += qty), 0)
    )
    .reduce((total, qty) => (total += qty), 0);

  const totalRevenue = orders
    .map((order) => order.total_price)
    .reduce((total, price) => (total += price), 0);

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    data: {
      ordersCount,
      usersCount,
      totalProductPurchase,
      productsCount,
      totalRevenue,
      pendingOrdersCount,
      newOrders,
      newUsers,
      newProducts,
    },
  });
});

const updateOrderDetails = catchAsyncErrors(async (req, res, next) => {
  const { orderId } = req.query;
  const { order_status, is_delivered } = req.body;

  const updatedOrder = await Order.findByIdAndUpdate(orderId, {
    order_status,
    is_delivered,
  });

  res.status(200).json({
    success: true,
    message: "Order updated successfully",
    data: {
      order: updatedOrder,
    },
  });
});

const getLetestOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().sort({ createdAt: -1 }).limit(30);

  res.status(200).json({
    success: true,
    message: "Operation performed successfully",
    data: {
      orders,
    },
  });
});

const getLetestUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find().sort({ createdAt: -1 }).limit(30);

  res.status(200).json({
    success: true,
    message: "Operation performed successfully",
    data: {
      users,
    },
  });
});

export {
  getDashboardAnalytics,
  updateOrderDetails,
  getLetestOrders,
  getLetestUsers,
};
