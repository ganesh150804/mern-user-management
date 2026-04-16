import User from "../models/User.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

//registration func
const registration = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashed = await hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashed,
      role
    });
    
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

// login funct
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await compare(password, user.password);

    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ msg: err.message });
  }
}
export { registration,login };