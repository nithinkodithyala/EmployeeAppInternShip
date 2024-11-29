


import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';
import { registerEmployee } from '../services/api'; // API function to register employee
import type { Employee } from '../types/employee';

export default function EmployeeForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Employee>();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Handle image file upload and show the image preview
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string); // Set image preview for display
      };
      reader.readAsDataURL(file); // Read the image file as base64
    }
  };

  // Handle form submission
  // const onSubmit = async (data: Employee) => {
  //   try {
  //     await registerEmployee(data); // Submit the form data
  //     toast.success('Employee added successfully!');
  //     reset(); // Reset the form after submission
  //     setImagePreview(null); // Clear the image preview
  //   } catch (error) {
  //     toast.error('Failed to add employee');
  //   }
  // };
  const onSubmit = async (data: Employee) => {
  const formData = new FormData();
  
  // Append form data
  formData.append("name", data.name);
  formData.append("email", data.email);
  formData.append("mobile", data.mobile);
  formData.append("designation", data.designation);
  formData.append("gender", data.gender);
  formData.append("course", data.course);

  // Append image if it exists
  const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
  if (fileInput?.files?.[0]) {
    formData.append("image", fileInput.files[0]);
  }

  try {
    await registerEmployee(formData); // Modify this to accept FormData in your API service
    toast.success('Employee added successfully!');
    reset(); // Reset form
    setImagePreview(null); // Clear the image preview
  } catch (error) {
    toast.error('Failed to add employee');
  }
};

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <UserPlus className="h-6 w-6 text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900">Add New Employee</h2>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Mobile</label>
            <input
              {...register('mobile', { required: 'Mobile is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              {...register('designation', { required: 'Designation is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Gender</label>
            <select
              {...register('gender', { required: 'Gender is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Course</label>
            <input
              {...register('course', { required: 'Course is required' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.course && <p className="text-red-500 text-sm">{errors.course.message}</p>}
          </div>

          {/* Image upload (only for preview, not part of form submission) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Uploaded Preview" className="w-20 h-20 object-cover rounded" />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Employee
          </button>
        </div>
      </form>
    </div>
  );
}
