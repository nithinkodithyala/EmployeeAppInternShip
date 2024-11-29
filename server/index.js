
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import User from './models/User.js';  // Assuming you have a 'User' model
import Employee from './models/Employee.js';  

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// Increase the body size limit for POST requests
app.use(express.json({ limit: '10mb' }));  // Increase the limit as needed (e.g., '50mb')
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || "mongodb+srv://amoghamith22:Guruvani5@cluster0.co9jvfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Auth routes (no JWT needed)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const user = new User({ email, password });
    await user.save();

    // JWT token returned here
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // JWT token returned here
    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Employee routes (no image handling)
app.post('/api/employees', async (req, res) => {
  try {
    const { name, email, mobile, designation, gender, course ,Image} = req.body;

    // Create new employee without image
    const newEmployee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      Image,
    });

    await newEmployee.save();

    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    res.status(500).send('Error adding employee');
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Server initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
