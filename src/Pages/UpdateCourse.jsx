import React, { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router";

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        price: "",
        duration: "",
        category: "",
        description: "",
        isFeatured: false,
    });

    // Fetch course data and prefill form
    useEffect(() => {
        if (id) {
            setLoading(true);
            axios
                .get(`http://localhost:3000/courses/${id}`)
                .then((res) => {
                    const course = res.data;
                    setFormData({
                        title: course.title || course.course_name || "",
                        image: course.thumbnail || course.image || "",
                        price: course.price || "",
                        duration: course.duration || "",
                        category: course.category || "",
                        description: course.description || "",
                        isFeatured: course.isFeatured || false,
                    });
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching course:", err);
                    toast.error("Failed to load course data.");
                    setLoading(false);
                });
        }
    }, [id]);

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
            const updatedCourse = {
                title: formData.title,
                price: formData.price,
                category: formData.category,
                description: formData.description,
                duration: formData.duration,
                thumbnail: formData.image,
                image: formData.image,
                isFeatured: formData.isFeatured,
            };

            const res = await axios.patch(`http://localhost:3000/courses/${id}`, updatedCourse);

            if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
                toast.success("🎉 Course Updated Successfully!");
                // Optionally navigate back after a short delay
                setTimeout(() => {
                    navigate("/dashboard/my-added-course");
                }, 1500);
            } else {
                toast.info("No changes were made to the course.");
            }
        } catch (error) {
            toast.error("❌ Failed to update course. Please try again.");
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-sky-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg font-medium">Loading course data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-sky-50 via-white to-sky-100 py-10 px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold text-center text-primary-gradient mb-6">Update Course</h2>

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
                        Update Course
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
};

export default UpdateCourse;
