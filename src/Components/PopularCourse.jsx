import React, { useState, useEffect } from "react";
import axios from "axios";

const PopularCourse = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch popular courses on component mount
    useEffect(() => {
        fetchPopularCourses();
    }, []);

    // Fetch function using Axios
    const fetchPopularCourses = async () => {
        try {
            setLoading(true);
            setError(null);

            // Make GET request to the API
            const response = await axios.get("http://localhost:3000/courses/popular-courses");

            // Set the courses data
            setCourses(response.data);
            setLoading(false);
        } catch (err) {
            // Handle errors
            setError(err.response?.data?.message || err.message);
            setLoading(false);
            console.error("Error fetching popular courses:", err);
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading popular courses...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
                    <h2 className="text-lg font-semibold text-red-900 mb-2">Error Loading Courses</h2>
                    <p className="text-red-700 mb-4">{error}</p>
                    <button onClick={fetchPopularCourses} className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">Popular Courses</h1>
                    <p>Explore all of our popular courses </p>
                </div>

                {/* Courses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
                            {/* Course Image */}
                            <img src={course.thumbnail || "/placeholder-course.jpg"} alt={course.title} className="w-full h-48 object-cover" />

                            {/* Course Content */}
                            <div className="p-6 flex flex-col grow">
                                <h3 className="text-xl font-semibold mb-2 h-14">{course.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 h-20">{course.description}</p>

                                {/* Course Info */}
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-gray-600">{course.studentsEnrolled || 0} students enrolled</span>
                                    {course.rating && <span className="text-sm text-yellow-500">⭐ {course.rating}</span>}
                                </div>

                                {/* Instructor */}
                                {course.instructor && <p className="text-sm text-gray-600 mb-4 min-h-6">By {course.instructor.name}</p>}

                                {/* Price and Button */}
                                <div className="flex items-center justify-between mt-auto">
                                    <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer">Enroll Now</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {courses.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-600">No popular courses found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default PopularCourse;