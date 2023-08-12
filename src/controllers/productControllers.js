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

const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    message: "This route is working.",
    data: {
      products,
    },
  });
});

const getSingleProductDetails = catchAsyncErrors(async (req, res, next) => {
  const { productId } = req.query;

  const singleProduct = await Product.findById(productId);

  res.status(200).json({
    success: true,
    message: "This route is working.",
    data: {
      product: singleProduct,
    },
  });
});

export { getAllEcoSpecialProducts, getSingleProductDetails, getAllProducts };
