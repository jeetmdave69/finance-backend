const User = require('../models/user');

// create user
exports.createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // basic validation for now
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const user = new User({ name, email, password, role });
        await user.save();

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update user role/status
exports.updateUser = async (req, res) => {
    try {
        const { role, status } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role, status },
            { new: true }
        );

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};