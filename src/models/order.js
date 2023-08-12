import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    order_items: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],

    shipping_address: {
      reciever_name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true },
      phone_number: { type: String, required: true },
    },
    payment_method: {
      type: String,
      required: true,
    },
    payment_results: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },

    total_price: {
      type: Number,
      required: true,
      default: 0.0,
    },

    order_status: {
      type: String,
      required: true,
      default: "pending",
    },

    is_delivered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);
