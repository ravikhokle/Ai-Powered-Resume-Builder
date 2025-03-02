import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const register = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: "User already exists", success: false });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const userData = { name, email, password: hashPassword };

        await userModel.create(userData);

        res.status(201).json({ message: "Registration successful", success: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
}

export default register;