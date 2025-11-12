import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const AddCourse = () => {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        price: "",
        duration: "",
        category: "",
        description: "",
        isFeatured: false,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newCourse = {
                course_name: formData.title,
                thumbnail: formData.image,
                price: parseFloat(formData.price),
                duration: formData.duration,
                category: formData.category,
                description: formData.description,
                isFeatured: formData.isFeatured,
            };

            const res = await axios.post("http://localhost:3000/courses", newCourse);
            if (res.data.insertedId) {
                toast.success("🎉 Course Added Successfully!");
                setFormData({
                    title: "",
                    image: "",
                    price: "",
                    duration: "",
                    category: "",
                    description: "",
                    isFeatured: false,
                });
            }
        } catch (error) {
            toast.error("❌ Failed to add course. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-sky-100 py-10 px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
                <h2 className="text-3xl font-bold text-center text-sky-600 mb-6">Add New Course</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Course Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter course title"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/course.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Price (৳)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Duration</label>
                            <input
                                type="text"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                placeholder="e.g. 8 weeks"
                                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="e.g. Web Development"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Write a short description..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 text-sky-500" />
                        <label className="text-gray-700 font-medium">Featured Course</label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md"
                    >
                        Add Course
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddCourse;
