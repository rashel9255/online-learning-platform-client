import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router";
import { BookOpen, Users, Clock, DollarSign, Star, PlayCircle, Eye, TrendingUp, Trash2 } from "lucide-react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const MyEnrolledCourse = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            setLoading(false);
            setEnrollments([]);
            return;
        }
        setLoading(true);
        // Try both userId and userEmail for compatibility
        const queryParam = user.uid ? `userId=${user.uid}` : `userEmail=${user.email}`;
        axios
            .get(`http://localhost:3000/enrolled-courses?${queryParam}`)
            .then((res) => {
                const data = Array.isArray(res.data) ? res.data : [];
                setEnrollments(data);
                setError(null);
            })
            .catch((error) => {
                console.error("Failed to load enrolled courses", error);
                setError("Failed to load your enrolled courses");
            })
            .finally(() => setLoading(false));
    }, [user]);

    const handleViewCourse = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    const handleRemoveCourse = async (enrollmentId, courseTitle) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to remove "${courseTitle}" from your enrolled courses?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, remove it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/enrolled-courses/${enrollmentId}`);
                    setEnrollments(enrollments.filter((enrollment) => enrollment._id !== enrollmentId));
                    toast.success("Course removed from your enrolled courses!");
                } catch (err) {
                    console.error("Error removing course:", err);
                    toast.error("Failed to remove course. Please try again.");
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg font-medium">Loading your enrolled courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-10">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Enrolled Courses</h1>
                            <p className="text-lg text-gray-600">Continue learning from where you left off</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white px-6 py-3 rounded-xl shadow-md border-2 border-indigo-100">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Total Enrolled</p>
                                        <p className="text-2xl font-bold text-indigo-600">{enrollments.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md mb-6">
                        <p className="text-red-700 font-semibold">{error}</p>
                    </div>
                )}

                {/* Courses Grid */}
                {enrollments.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                        <BookOpen className="mx-auto h-24 w-24 text-gray-300 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No enrolled courses yet</h3>
                        <p className="text-gray-600 mb-6">Start your learning journey by enrolling in courses!</p>
                        <Link to="/courses" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg">
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {enrollments.map((enrollment) => (
                            <div
                                key={enrollment._id || enrollment.courseId}
                                className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100"
                            >
                                {/* Course Image */}
                                <div className="relative h-48 overflow-hidden bg-linear-to-br from-indigo-500 to-purple-600">
                                    {enrollment.thumbnail || enrollment.image ? (
                                        <img
                                            src={enrollment.thumbnail || enrollment.image}
                                            alt={enrollment.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="h-20 w-20 text-white opacity-60" />
                                        </div>
                                    )}
                                    {/* Enrolled Badge */}
                                    <div className="absolute top-3 left-3">
                                        <span className="bg-green-500/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg text-xs font-bold text-white">Enrolled</span>
                                    </div>
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Course Content */}
                                <div className="p-5">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors min-h-14">{enrollment.title}</h3>

                                    {/* Instructor */}
                                    {enrollment.instructor && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <Users className="h-4 w-4 text-indigo-600 shrink-0" />
                                            <span className="text-sm text-gray-600">
                                                {typeof enrollment.instructor === "string" ? enrollment.instructor : enrollment.instructor.name || "Unknown Instructor"}
                                            </span>
                                        </div>
                                    )}

                                    {/* Course Stats */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                                            <Clock className="h-4 w-4 text-indigo-600 shrink-0" />
                                            <span className="text-sm font-medium truncate">{enrollment.duration || "Self-paced"}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                                            <FaBangladeshiTakaSign className="h-5 w-5 text-green-600" />
                                            <span className="text-sm font-medium">{enrollment.price || "0"}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        {/* View Course Button */}
                                        <button
                                            onClick={() => handleViewCourse(enrollment.courseId)}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 px-4 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Eye className="h-5 w-5" />
                                            View Course Details
                                        </button>

                                        {/* Remove Course Button */}
                                        <button
                                            onClick={() => handleRemoveCourse(enrollment._id, enrollment.title)}
                                            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-xl font-semibold transition-all hover:shadow-lg flex items-center justify-center gap-2"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                            Remove Course
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyEnrolledCourse;
