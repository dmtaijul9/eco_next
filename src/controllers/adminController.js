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

  const pendingOrdersCount = await Order.count({ is_delivered: false });

  const newOrders = await Order.find({ is_delivered: false })
    .sort({ createdAt: -1 })
    .limit(10);

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
    },
  });
});

export { getDashboardAnalytics };
