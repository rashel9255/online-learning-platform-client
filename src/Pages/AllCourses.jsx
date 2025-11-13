import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const AllCourses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/courses");
            setCourses(response.data);
            setError(null);
        } catch (err) {
            setError("Failed to load courses. Please try again later.");
            console.error("Error fetching courses:", err);
        } finally {
            setLoading(false);
        }
    };

    const filteredCourses = courses.filter((course) => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === "all" || course.category === filter;
        return matchesSearch && matchesFilter;
    });

    const categories = ["all", ...new Set(courses.map((c) => c.category))];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading courses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button onClick={fetchCourses} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white text-center shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Explore Courses</h1>
                    <p className="text-gray-600">Discover all amazing courses to boost your skills</p>
                </div>
            </div>

            {/* Filters and Search */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    {/* Search Bar */}
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                        />
                    </div>

                    {/* Category Filters */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setFilter(category)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition ${filter === category ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                            >
                                {category === "all" ? "All Courses" : category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results Count */}
                <p className="text-gray-600 mb-4">
                    Showing {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
                </p>

                {/* Courses Grid */}
                {filteredCourses.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredCourses.map((course) => (
                            <div key={course._id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                                {/* Course Image */}
                                <div className="relative h-48 flex items-center justify-center">
                                    <img src={course.thumbnail} alt="" className="h-full" />
                                    {course.isBestseller && <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded">BESTSELLER</span>}
                                    {course.isNew && <span className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>}
                                </div>

                                {/* Course Content */}
                                <div className="p-4 flex flex-col grow">
                                    {/* Category */}
                                    <span className="text-xs font-semibold text-blue-600 uppercase mb-2">{course.category}</span>

                                    {/* Title */}
                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 grow">{course.description}</p>

                                    {/* Instructor */}
                                    <div className="flex items-center mb-3">
                                        <span className="font-bold text-sm text-gray-700">Instructor: {course.instructor.name}</span>
                                    </div>

                                    {/* Rating */}
                                    <div className="flex items-center mb-3">
                                        <span className="text-yellow-500 font-bold">{course.rating}</span>
                                        <div className="flex ml-1">
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="text-yellow-500">
                                                    {i < Math.floor(course.rating) ? "★" : "☆"}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="ml-2 text-xs text-gray-500">({(course.totalRatings || 0).toLocaleString()})</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                                        <span>👥 {(course.studentsEnrolled || 0).toLocaleString()} students</span>
                                        <span>⏱️ {course.duration}</span>
                                    </div>

                                    {/* Level Badge */}
                                    <div className="mb-3">
                                        <span
                                            className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                                                course.level === "Beginner"
                                                    ? "bg-green-100 text-green-800"
                                                    : course.level === "Intermediate"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : "bg-red-100 text-red-800"
                                            }`}
                                        >
                                            {course.level}
                                        </span>
                                    </div>

                                    {/* Price */}
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
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AllCourses;