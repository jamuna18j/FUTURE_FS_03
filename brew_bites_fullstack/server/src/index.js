import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { Admin, MenuItem, Order, Reservation } from "./models.js";
import { requireAdmin } from "./middleware.js";
import { seedInitialData } from "./seed.js";

dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), "../.env") });

const app = express();
const PORT = Number(process.env.PORT || 5000);
app.disable("x-powered-by");
app.use(cors({ origin: process.env.CLIENT_ORIGIN ? process.env.CLIENT_ORIGIN.split(",").map(x => x.trim()) : "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { message: "Too many login attempts. Try again later." } });
const text = (value, max = 100) => typeof value === "string" ? value.trim().slice(0, max) : "";
const validPhone = value => /^[+()\d\s-]{7,25}$/.test(value || "");
const asyncRoute = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

app.get("/api/health", (req, res) => res.json({ status: "ok", service: "Brew & Bites API", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" }));

app.get("/api/menu", asyncRoute(async (req, res) => {
  const filter = { available: true };
  if (req.query.category && ["Spicy", "Sweet", "Ice & Juice", "Combos", "Offers", "Coffee"].includes(req.query.category)) filter.category = req.query.category;
  const items = await MenuItem.find(filter).sort({ price: 1, name: 1 }).lean();
  res.json(items);
}));

app.post("/api/orders", asyncRoute(async (req, res) => {
  const customerName = text(req.body.customerName, 100);
  const phone = text(req.body.phone, 25);
  const notes = text(req.body.notes, 500);
  if (customerName.length < 2) return res.status(400).json({ message: "Please enter your name." });
  if (!validPhone(phone)) return res.status(400).json({ message: "Please enter a valid phone number." });
  if (!Array.isArray(req.body.items) || req.body.items.length === 0 || req.body.items.length > 30) return res.status(400).json({ message: "Your cart is empty or too large." });

  const requested = new Map();
  for (const row of req.body.items) {
    const id = String(row.menuItem || "");
    const quantity = Number(row.quantity);
    if (!mongoose.isValidObjectId(id) || !Number.isInteger(quantity) || quantity < 1 || quantity > 50) return res.status(400).json({ message: "One or more cart items are invalid." });
    requested.set(id, (requested.get(id) || 0) + quantity);
  }
  const menu = await MenuItem.find({ _id: { $in: [...requested.keys()] }, available: true });
  if (menu.length !== requested.size) return res.status(400).json({ message: "Some items are unavailable. Refresh the menu and try again." });
  const items = menu.map(item => ({ menuItem: item._id, name: item.name, price: item.price, quantity: requested.get(String(item._id)) }));
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const order = await Order.create({ customerName, phone, notes, items, total });
  res.status(201).json({ message: "Order request saved. The café will confirm it.", order: { id: order._id, total: order.total, status: order.status } });
}));

app.post("/api/reservations", asyncRoute(async (req, res) => {
  const name = text(req.body.name, 100), phone = text(req.body.phone, 25), date = text(req.body.date, 10), time = text(req.body.time, 30), note = text(req.body.note, 500);
  const guests = Number(req.body.guests);
  if (name.length < 2) return res.status(400).json({ message: "Please enter your name." });
  if (!validPhone(phone)) return res.status(400).json({ message: "Please enter a valid phone number." });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < new Date().toISOString().slice(0, 10)) return res.status(400).json({ message: "Choose today or a future date." });
  if (!time || !Number.isInteger(guests) || guests < 1 || guests > 30) return res.status(400).json({ message: "Please check the time and guest count." });
  const reservation = await Reservation.create({ name, phone, date, time, guests, note });
  res.status(201).json({ message: "Reservation request saved. The café must confirm availability.", reservation: { id: reservation._id, status: reservation.status } });
}));

app.post("/api/auth/login", loginLimiter, asyncRoute(async (req, res) => {
  const email = text(req.body.email, 254).toLowerCase();
  const password = typeof req.body.password === "string" ? req.body.password : "";
  const admin = await Admin.findOne({ email });
  if (!admin || admin.role !== "admin" || !(await bcrypt.compare(password, admin.passwordHash))) return res.status(401).json({ message: "Invalid email or password." });
  const token = jwt.sign({ sub: String(admin._id), email: admin.email, role: admin.role }, process.env.JWT_SECRET, { algorithm: "HS256", expiresIn: "8h" });
  res.json({ token, expiresIn: "8h", admin: { name: admin.name, email: admin.email, role: admin.role } });
}));

app.use("/api/admin", requireAdmin);

app.get("/api/admin/summary", asyncRoute(async (req, res) => {
  const [menuCount, orderCount, pendingOrders, reservationCount, revenueResult] = await Promise.all([
    MenuItem.countDocuments(), Order.countDocuments(), Order.countDocuments({ status: "Pending" }),
    Reservation.countDocuments({ status: "Requested" }), Order.aggregate([{ $match: { status: { $nin: ["Cancelled"] } } }, { $group: { _id: null, total: { $sum: "$total" } } }])
  ]);
  res.json({ menuCount, orderCount, pendingOrders, reservationCount, recordedOrderValue: revenueResult[0]?.total || 0 });
}));

app.get("/api/admin/menu", asyncRoute(async (req, res) => res.json(await MenuItem.find().sort({ price: 1, name: 1 }).lean())));
app.post("/api/admin/menu", asyncRoute(async (req, res) => {
  const body = req.body;
  const name = text(body.name, 90), description = text(body.description, 300), image = text(body.image, 1000), tag = text(body.tag, 40);
  const price = Number(body.price);
  if (name.length < 2 || !["Spicy", "Sweet", "Ice & Juice", "Combos", "Offers", "Coffee"].includes(body.category) || !Number.isFinite(price) || price < 1) return res.status(400).json({ message: "Name, valid category and price are required." });
  if (image && !/^https?:\/\//i.test(image)) return res.status(400).json({ message: "Image must be an http(s) URL." });
  const item = await MenuItem.create({ name, category: body.category, price, description, image, tag, vegetarian: body.vegetarian !== false, available: body.available !== false });
  res.status(201).json(item);
}));
app.patch("/api/admin/menu/:id", asyncRoute(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid menu item ID." });
  const body = req.body, update = {};
  if (body.name !== undefined) update.name = text(body.name, 90);
  if (body.description !== undefined) update.description = text(body.description, 300);
  if (body.tag !== undefined) update.tag = text(body.tag, 40);
  if (body.image !== undefined) {
    update.image = text(body.image, 1000);
    if (update.image && !/^https?:\/\//i.test(update.image)) return res.status(400).json({ message: "Image must be an http(s) URL." });
  }
  if (body.category !== undefined) {
    if (!["Spicy", "Sweet", "Ice & Juice", "Combos", "Offers", "Coffee"].includes(body.category)) return res.status(400).json({ message: "Invalid category." });
    update.category = body.category;
  }
  if (body.price !== undefined) {
    update.price = Number(body.price);
    if (!Number.isFinite(update.price) || update.price < 1) return res.status(400).json({ message: "Price must be at least ₹1." });
  }
  for (const key of ["vegetarian", "available"]) if (body[key] !== undefined) update[key] = Boolean(body[key]);
  const item = await MenuItem.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true });
  if (!item) return res.status(404).json({ message: "Menu item not found." });
  res.json(item);
}));
app.delete("/api/admin/menu/:id", asyncRoute(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid menu item ID." });
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Menu item not found." });
  res.json({ message: "Menu item deleted." });
}));

app.get("/api/admin/orders", asyncRoute(async (req, res) => res.json(await Order.find().sort({ createdAt: -1 }).limit(200).lean())));
app.patch("/api/admin/orders/:id/status", asyncRoute(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid order ID." });
  const allowed = ["Pending", "Preparing", "Ready", "Completed", "Cancelled"];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: "Invalid order status." });
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!order) return res.status(404).json({ message: "Order not found." });
  res.json(order);
}));
app.get("/api/admin/reservations", asyncRoute(async (req, res) => res.json(await Reservation.find().sort({ createdAt: -1 }).limit(200).lean())));
app.patch("/api/admin/reservations/:id/status", asyncRoute(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid reservation ID." });
  if (!["Requested", "Confirmed", "Declined"].includes(req.body.status)) return res.status(400).json({ message: "Invalid reservation status." });
  const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  if (!reservation) return res.status(404).json({ message: "Reservation not found." });
  res.json(reservation);
}));

app.use((req, res) => res.status(404).json({ message: "Route not found." }));
app.use((err, req, res, next) => {
  console.error(err);
  if (err?.name === "ValidationError") return res.status(400).json({ message: "Please check the submitted details." });
  if (err?.code === 11000) return res.status(409).json({ message: "That record already exists." });
  res.status(500).json({ message: "Something went wrong on the server. Check the server terminal for details." });
});

async function start() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET || process.env.JWT_SECRET.length < 24) {
    throw new Error("Configure MONGODB_URI and a JWT_SECRET of at least 24 characters in server/.env.");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected.");
  await seedInitialData();
  app.listen(PORT, () => console.log(`Brew & Bites API running at http://localhost:${PORT}`));
}
start().catch(err => { console.error("Startup failed:", err.message); process.exit(1); });
