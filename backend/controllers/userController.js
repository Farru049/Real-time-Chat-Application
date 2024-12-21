import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/userModel.js';  // Correct import for the model

// 1) Register User
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await UserModel.create({ username, email, password: hashedPassword });

        // Send response with new user data (except password)
        res.status(201).json({ username: newUser.username, email: newUser.email });
    } catch (err) {
        res.status(500).json({ error: "Registration Failed", detail: err.message });
    }
};

// 2) Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

        // Send token as response
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Login attempt failed', details: error.message });
    }
};
