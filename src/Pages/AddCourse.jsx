import React, { useState, useContext } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../Context/AuthContext";

const AddCourse = () => {
    const { user } = useContext(AuthContext); // 🔹 logged-in user info
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
            // 🧠 Instructor info automatically from user
            const instructorInfo = {
                name: user?.displayName || "Unknown Instructor",
                bio: null,
                avatar: user?.photoURL || "https://i.ibb.co/8z7zjNY/default-avatar.png",
                email: user?.email || "not_provided",
                rating: null
            };

            const newCourse = {
                title: formData.title,
                description: formData.description,
                instructor: instructorInfo,
                category: formData.category,
                subcategory: null,
                level: null,
                price: parseFloat(formData.price),
                originalPrice: null,
                currency: "USD",
                duration: formData.duration,
                language: null,
                subtitles: [],
                thumbnail: formData.image,
                rating: null,
                totalRatings: null,
                studentsEnrolled: 0,
                lastUpdated: new Date().toISOString().split("T")[0],
                objectives: [],
                requirements: [],
                curriculum: null,
                features: [],
                tags: [],
                isBestseller: false,
                isNew: true,
                isFeatured: formData.isFeatured,
                createdAt: new Date().toISOString(),
                discount: null,
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
                <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-gradient mb-6">Add New Course</h2>


                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
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

                    {/* Image */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Price & Duration */}
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

                    {/* Category */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none bg-white"
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Web Development">Web Development</option>
                            <option value="App Development">App Development</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Design">Design</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Cyber Security">Cyber Security</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Video Editing">Video Editing</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Description */}
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

                    {/* Featured */}
                    <div className="flex items-center gap-2">
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 text-sky-500" />
                        <label className="text-gray-700 font-medium">Featured Course</label>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-md cursor-pointer"
                    >
                        Add Course
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddCourse;
