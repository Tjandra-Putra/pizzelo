import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    image: {
      type: String,
      required: true,
    },
    prices: {
      type: [Number], // array of numbers
      required: true,
    },
    extraOptions: {
      type: [{ text: { type: String, required: true }, price: { type: Number, required: true } }], // array of objects
    },
  },
  { timestamps: true } // auto time and date creation
);

// export default mongoose.model("Product", ProductSchema);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
// condition to check: if we already have product model, do not create again. If no model in DB, just create new model product.
