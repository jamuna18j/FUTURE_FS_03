import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 90 },
  category: { type: String, enum: ["Spicy", "Sweet", "Ice & Juice", "Combos", "Offers", "Coffee"], required: true },
  price: { type: Number, required: true, min: 1 },
  description: { type: String, default: "", maxlength: 300 },
  image: { type: String, default: "" },
  vegetarian: { type: Boolean, default: true },
  available: { type: Boolean, default: true },
  tag: { type: String, default: "Fresh pick", maxlength: 40 }
}, { timestamps: true });

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 25 },
  items: [{
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1, max: 50 }
  }],
  total: { type: Number, required: true, min: 0 },
  notes: { type: String, default: "", maxlength: 500 },
  status: { type: String, enum: ["Pending", "Preparing", "Ready", "Completed", "Cancelled"], default: "Pending" }
}, { timestamps: true });

const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  phone: { type: String, required: true, trim: true, maxlength: 25 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true, min: 1, max: 30 },
  note: { type: String, default: "", maxlength: 500 },
  status: { type: String, enum: ["Requested", "Confirmed", "Declined"], default: "Requested" }
}, { timestamps: true });

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "admin" }
}, { timestamps: true });

export const MenuItem = mongoose.model("MenuItem", menuSchema);
export const Order = mongoose.model("Order", orderSchema);
export const Reservation = mongoose.model("Reservation", reservationSchema);
export const Admin = mongoose.model("Admin", adminSchema);
