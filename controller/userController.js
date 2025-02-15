const bcryptjs = require("bcryptjs")
const User = require("../modules/userModule");


// REGISTER USER
const registerUser = async (req, res) => {
    try {
        let { name, email, userName, password, phoneNumber, sex, maritalStatus } = req.body;
        // VALIDATE REQUIRED FIELDS
        if (
            !name ||
            !email ||
            !userName ||
            !password ||
            !phoneNumber ||
            !sex ||
            !maritalStatus
        )   {
            return res
                .status(400)
                .json({ message: "All Required Fields Must be Provided"});
        }
        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // save user in database
        const newUser = new User({
            name,
            email,
            userName,
            password: hashedPassword,
            phoneNumber,
            sex,
            maritalStatus,
        });

        // REGISTER USER IN DATABASE
        const registeredUser = await newUser.save();
        res.status(201).json(registeredUser);
    }   catch (err) {
        console.error("registration Error", err);
        // Handle duplicate key errors
        if (err.code === 11000) {
            return res.status(400).json({
                message: "User already exist",
                field: Object.keys(err.keyValue),
            });
        }
        res
            .status(500)
            .json({ message: "Error registering user", err: err.message });
    }
};

// login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate required fields

        if (!email || !password) {
            return res
            .status(400)
            .json({ message: "email and password are required"});
        }

        // find the user by userName
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Invalid "});
        }
        console.log(user);
        // compare password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password"});
        };

        res.status(200).json(user);
    }   catch (error) {
        res.status(500).json({ message: "Error logging in", error});
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        // find user by id
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ message: "User Not Found"});
        }
        // find user fields
        const updatedData = req.body;

        // only hash password if its being updated
        if (updatedData.password) {
            const salt = await bcryptjs.genSalt(10);
            updatedData.password = await bcryptjs.hash(updatedData.password, salt);
        }
        // update user in the database
        const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
            new: true, //return the updated document
            runValidators: true, //enforce validators rule 
        });
        res
            .status(200)
            .json({ message: "User Updated Successfully", updatedUser});
    } catch (error) {
        console.error("Error updating user", error);
        res
            .status(500)
            .json({ message: "Error Updating User", error: error.message });
    }
};

// Get all users
const getAllUser = async ( req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// GET USER BY ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }   catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// Delete the User
let deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        // check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }
        // Delete the user
        await user.deleteOne();
        res.status(200).json({ message: "User deleted successfully" });
    }   catch (error) {
        console.error("Error deleting user", error);
        res
            .status(500)
            .json({ message: "Error deleting user", error: error.message});
    }
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    getAllUser,
    getUserById,
    deleteUser
};