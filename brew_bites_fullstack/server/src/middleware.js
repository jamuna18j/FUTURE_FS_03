import jwt from "jsonwebtoken";
import { Admin } from "./models.js";

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return res.status(401).json({ message: "Admin sign-in required." });
  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
  } catch {
    return res.status(401).json({ message: "Your session is invalid or expired. Please sign in again." });
  }
  if (!payload || typeof payload !== "object" || typeof payload.sub !== "string" || !/^[a-f\d]{24}$/i.test(payload.sub)) {
    return res.status(401).json({ message: "Your session is invalid or expired. Please sign in again." });
  }
  Admin.findById(payload.sub).select("email role").lean().then(admin => {
    if (!admin || admin.role !== "admin") return res.status(401).json({ message: "Your session is invalid or expired. Please sign in again." });
    req.admin = { id: String(admin._id), email: admin.email, role: admin.role };
    next();
  }).catch(next);
}
