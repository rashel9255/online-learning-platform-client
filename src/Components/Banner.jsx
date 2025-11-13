// BannerWithCourses.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Users, Star } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function BannerWithCourses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    // Fetch popular courses
    useEffect(() => {
        fetchPopularCourses();
    }, []);

    const fetchPopularCourses = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get("https://online-learning-platform-server-alpha.vercel.app/courses/popular-courses");
            setCourses(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
            console.error("Error fetching courses:", err);
        }
    };

    // Auto-play slider
    useEffect(() => {
        if (courses.length === 0) return;

        const timer = setInterval(() => {
            setDirection(1);
            setCurrentIndex((prev) => (prev + 1) % courses.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [courses.length]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % courses.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
    };

    const goToSlide = (index) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    // Animation variants
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const contentVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    if (loading) {
        return (
            <div className="relative w-full h-[600px] bg-linear-to-br from-blue-600 via-purple-600 to-pink-500 flex items-center justify-center">
                <div className="text-white text-2xl">Loading Popular Courses...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="relative w-full h-[600px] bg-linear-to-br from-red-600 to-orange-500 flex items-center justify-center">
                <div className="text-white text-center">
                    <h2 className="text-3xl font-bold mb-4">Error Loading Courses</h2>
                    <p className="mb-4">{error}</p>
                    <button onClick={fetchPopularCourses} className="bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-gray-100">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="relative w-full h-[600px] bg-linear-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                <div className="text-white text-2xl">No Popular Courses Found</div>
            </div>
        );
    }

    const currentCourse = courses[currentIndex];

    return (
        <div className="relative w-full h-[600px] overflow-hidden bg-linear-to-br from-blue-600 via-purple-600 to-pink-500">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
                    animate={{
                        scale: [1, 1.3, 1],
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                />
            </div>

            {/* Slider Container */}
            <div className="relative h-full">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                        className="absolute inset-0"
                    >
                        <div className="container mx-auto px-4 h-full flex items-center">
                            <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                                {/* Left Content */}
                                <div className="text-white space-y-6">
                                    <motion.div custom={0} variants={contentVariants} initial="hidden" animate="visible">
                                        <span className="inline-block bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold mb-4">🔥 Popular Course</span>
                                    </motion.div>

                                    <motion.h1 custom={1} variants={contentVariants} initial="hidden" animate="visible" className="text-4xl md:text-6xl font-bold leading-tight">
                                        {currentCourse.title}
                                    </motion.h1>

                                    <motion.p custom={2} variants={contentVariants} initial="hidden" animate="visible" className="text-lg md:text-xl text-gray-100 line-clamp-3">
                                        {currentCourse.description}
                                    </motion.p>

                                    {/* Course Meta */}
                                    <motion.div custom={3} variants={contentVariants} initial="hidden" animate="visible" className="flex flex-wrap gap-6 text-white">
                                        {currentCourse.instructor && (
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-5 h-5" />
                                                <span>{typeof currentCourse.instructor === "object" ? currentCourse.instructor.name : currentCourse.instructor}</span>
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2">
                                            <Users className="w-5 h-5" />
                                            <span>{currentCourse.studentsEnrolled || 0} Students</span>
                                        </div>
                                        {currentCourse.rating && (
                                            <div className="flex items-center gap-2">
                                                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                                <span>{currentCourse.rating}</span>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Right Image/Card */}
                                <motion.div custom={5} variants={contentVariants} initial="hidden" animate="visible" className="hidden md:block">
                                    <div className="relative">
                                        <div className="relative bg-opacity-20 rounded-3xl overflow-hidden">
                                            {currentCourse.thumbnail ? (
                                                <img src={currentCourse.thumbnail} alt={currentCourse.title} className="w-full h-80 object-cover rounded-2xl" />
                                            ) : (
                                                <div className="w-full h-80 bg-linear-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center">
                                                    <BookOpen className="w-24 h-24 text-white opacity-50" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2  bg-opacity-30 hover:bg-opacity-50 backdrop-blur-xs text-white p-3  rounded-full transition-all z-10 hover:scale-110"
            >
                <FaChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-opacity-30 hover:bg-opacity-50 backdrop-blur-xs text-white p-3 rounded-full transition-all z-10 hover:scale-110"
            >
                <FaChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Navigation */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
                {courses.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-3 rounded-full transition-all ${index === currentIndex ? "bg-white w-8" : "bg-white bg-opacity-50 w-3 hover:bg-opacity-75"}`}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    />
                ))}
            </div>
        </div>
    );
}
