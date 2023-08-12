import catchAsyncErrors from "@/middlewares/catchAsyncErrors";
import Product from "@/models/product";
import User from "@/models/user";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dmtaijul9",
  api_key: "845221367289486",
  api_secret: "d92OdzN48WQCm6a75ruLl9rkQpc",
});

const createProduct = catchAsyncErrors(async (req, res, next) => {
  const { name, category, description, image, brand, price, isEcoSpecial } =
    req.body;

  const uploadImage = await cloudinary.uploader.upload(image, {
    folder: "eco_next/product",
    width: "150",
    crop: "scale",
  });

  const newProduct = await Product.create({
    user: req.user.user._id,
    name,
    image: uploadImage.secure_url,
    brand,
    category,
    description,
    price,
    isEcoSpecial,
  });

  res.status(200).json({
    success: true,
    message: "Prodcut created successfully.",
    data: {
      product: newProduct,
    },
  });
});

const getAllEcoSpecialProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ isEcoSpecial: true }).sort(
    "-createdAt"
  );

  res.status(200).json({
    success: true,
    message: "This route is working.",
    data: {
      products,
    },
  });
});

const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().sort("-createdAt");

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

export {
  getAllEcoSpecialProducts,
  getSingleProductDetails,
  getAllProducts,
  createProduct,
};
