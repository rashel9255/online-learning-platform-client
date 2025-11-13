import React, { useState, useContext, useEffect } from "react";
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
        instructorName: "",
        instructorEmail: "",
        instructorPhoto: "",
    });

    // Auto-fill instructor details from Firebase when user is available
    useEffect(() => {
        if (user) {
            setFormData((prev) => ({
                ...prev,
                instructorName: user.displayName || "",
                instructorEmail: user.email || "",
                instructorPhoto: user.photoURL || "https://i.ibb.co/8z7zjNY/default-avatar.png",
            }));
        }
    }, [user]);

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
            // 🧠 Instructor info from form data (auto-filled from Firebase)
            const instructorInfo = {
                name: formData.instructorName || user?.displayName || "Unknown Instructor",
                bio: null,
                avatar: formData.instructorPhoto || user?.photoURL || "https://i.ibb.co/8z7zjNY/default-avatar.png",
                email: formData.instructorEmail || user?.email || "not_provided",
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
                    instructorName: user?.displayName || "",
                    instructorEmail: user?.email || "",
                    instructorPhoto: user?.photoURL || "https://i.ibb.co/8z7zjNY/default-avatar.png",
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
                    {/* Instructor Details Section */}
                    <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="text-blue-600">👤</span> Instructor Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Instructor Name */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1 text-sm">Instructor Name</label>
                                <input
                                    type="text"
                                    name="instructorName"
                                    value={formData.instructorName}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none bg-white"
                                    readOnly
                                />
                            </div>

                            {/* Instructor Email */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1 text-sm">Instructor Email</label>
                                <input
                                    type="email"
                                    name="instructorEmail"
                                    value={formData.instructorEmail}
                                    onChange={handleChange}
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none bg-white"
                                    readOnly
                                />
                            </div>
                            {/* Instructor Photo */}
                            <div>
                                <label className="block text-gray-700 font-medium mb-1 text-sm">Instructor Photo URL</label>
                                <input
                                    type="url"
                                    name="instructorPhoto"
                                    value={formData.instructorPhoto}
                                    onChange={handleChange}
                                    placeholder="https://example.com/photo.jpg"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none bg-white"
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
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
