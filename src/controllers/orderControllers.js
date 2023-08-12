import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import User from "@/models/user";
import Order from "@/models/order";
import ErrorHandler from "@/utils/errorHandler";

const createNewOrder = catchAsyncErrors(async (req, res, next) => {
  const { order_items, shipping_address, payment_method, total_price } =
    req.body;

  console.log(req.user);
  const user = await User.findOne({ email: req.user.email });

  const order = await Order.create({
    user: user._id,
    order_items,
    shipping_address: {
      ...shipping_address,
      phone_number: user.phone,
    },
    payment_method,
    total_price,
  });

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    data: {
      order,
    },
  });
});

const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;

  const order = await Order.findById(id);

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Order created successfully",
    data: {
      order,
    },
  });
});

export { createNewOrder, getSingleOrder };
