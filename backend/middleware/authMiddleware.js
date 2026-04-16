import jwt from "jsonwebtoken";
import User from '../models/User.js';

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: "No token provided" });
        }

        const token = authHeader.split(' ')[1];

        // jwt.verify throws error if invalid, moving straight to catch block
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Use ID directly
        const user = await User.findById(decoded.id).select('-password');
 
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Auth Error:", error.message);
        // Distinguish between JWT errors and Server errors
        const message = error.name === 'JsonWebTokenError' ? "Invalid token" : "Server error";
        return res.status(error.name === 'JsonWebTokenError' ? 401 : 500).json({ success: false, error: message });
    }
}


export default verifyUser;