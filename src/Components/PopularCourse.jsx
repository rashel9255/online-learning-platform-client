import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Link } from "react-router";

const PopularCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageErrors, setImageErrors] = useState({});

    useEffect(() => {
        fetchPopularCourses();
    }, []);

    const fetchPopularCourses = async () => {
        try {
            setLoading(true);
            const res = await axios.get("http://localhost:3000/courses/popular-courses");
            setCourses(res.data || []);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Unknown error");
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = (id) => {
        setImageErrors((prev) => ({ ...prev, [id]: true }));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.98 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45 } },
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto" />
                    <p className="mt-4 text-gray-600">Loading popular courses...</p>
                </motion.div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <motion.div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Courses</h2>
                    <p className="text-red-700 mb-4">{error}</p>
                    <button onClick={fetchPopularCourses} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                        Try Again
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <motion.div className="mb-12 text-center" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Popular Courses</h1>
                    <p className="text-lg text-gray-600">Explore all of our popular courses</p>
                    <motion.div
                        className="w-24 h-1 bg-blue-600 mx-auto mt-4 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />
                </motion.div>

                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {courses.map((course, index) => (
                        <motion.div
                            key={course._id || index}
                            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.01 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div className="relative overflow-hidden h-48 group">
                                {/* Image or placeholder */}
                                {!imageErrors[course._id] && course.thumbnail ? (
                                    <img
                                        src={course.thumbnail}
                                        alt={course.title}
                                        onError={() => handleImageError(course._id)}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-0"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-400 to-purple-500">
                                        <div className="text-center text-white">
                                            <svg className="w-16 h-16 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                            <p className="text-sm opacity-75">Course Image</p>
                                        </div>
                                    </div>
                                )}

                                <div className="absolute inset-0 z-10 pointer-events-none">
                                    <div className="w-full h-full bg-blue-600 opacity-0 group-hover:opacity-60 transition-opacity duration-300 mix-blend-multiply" />
                                </div>

                                {/* Label on top */}
                                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                                    <span className="text-white font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">View Details</span>
                                </div>
                            </div>

                            <div className="p-6 flex flex-col grow">
                                <h3 className="text-xl font-semibold mb-2 h-14 line-clamp-2">{course.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 h-20 line-clamp-3">{course.description}</p>

                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-600">{course.studentsEnrolled?.toLocaleString() || 0} students enrolled</span>
                                    {course.rating && <span className="text-sm text-yellow-500">⭐ {course.rating}</span>}
                                </div>

                                {course.instructor && <p className="text-sm text-gray-600 mb-4">By {course.instructor.name}</p>}

                                <div className="flex items-center justify-between mt-auto pt-3 border-t">
                                    <div>
                                        <span className="text-2xl font-bold text-gray-900">${course.price}</span>
                                        {course.originalPrice > course.price && <span className="ml-2 text-sm text-gray-500 line-through">${course.originalPrice}</span>}
                                    </div>
                                    <Link to={`/courses/${course._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-semibold">
                                        Details
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {courses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No popular courses found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularCourse;
