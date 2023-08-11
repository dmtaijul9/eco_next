import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Product from "@/models/product";

const getAllEcoSpecialProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ isEcoSpecial: true });

  res.status(200).json({
    success: true,
    message: "This route is working.",
    data: {
      products,
    },
  });
});

export { getAllEcoSpecialProducts };
