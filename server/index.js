const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/PEP', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("DB connected");
    } catch (err) {
        console.error("Error in connection to DB:", err);
        process.exit(1);
    }
};
connectDB();

// Schema & Model
const mySchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const myModel = mongoose.model('student_user', mySchema);

// Routes to check server
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if email already exists
        const existingUseremail = await myModel.findOne({ email });
        if (existingUseremail) {
            return res.status(400).json({ error: "Email already registered" });
        }
        //check if user alerady exists
        const existingUsername = await myModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ error: "Username already registered" });
        }

        const newUser = new myModel({ username, email, password });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await myModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        if (user.password === password) {
            const uid = user._id;  // Get user's ID
            return res.json({ id: uid, username: user.username, status: "success" }); // Send single response
        } else {
            return res.status(401).json({ message: "Incorrect password" });
        }
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: "Server error" });
    }
});

// Server Listen
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Handle process exit
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
    process.exit(0);
});
