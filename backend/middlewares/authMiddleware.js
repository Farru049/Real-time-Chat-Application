import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js"; // Import the User model to fetch user details if needed

// Middleware to verify JWT token
export const authenticate = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Access Denied. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID or other data from the token to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token", details: err.message });
  }
};

// Middleware to check for admin privileges (optional, if you have roles)
export const isAdmin = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({ error: "Access Denied. Admin privileges required." });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Authorization failed", details: err.message });
  }
};
