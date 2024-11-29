import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  mobile: {
    type: String,
    required: true,
    trim: true,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true,
  },
  course: {
    type: String,
    required: true,
    trim: true,
  },
  Image: {
    type: String, // Store the Base64 string for the image
    required: false, // Optional (can be omitted if not provided)
  },
}, {
  timestamps: true,
});

export default mongoose.model('Employee', employeeSchema);
