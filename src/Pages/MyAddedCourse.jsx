import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { BookOpen, Users, Clock, DollarSign, Star, Trash2, Edit, TrendingUp } from "lucide-react";
import Swal from "sweetalert2";

const MyCourses = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (user?.email) {
            setLoading(true);
            axios
                .get(`http://localhost:3000/courses/user/${user.email}`)
                .then((res) => {
                    setCourses(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    setError("Failed to load courses");
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This course will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:3000/courses/${id}`);
                    setCourses(courses.filter((course) => course._id !== id));

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your course has been deleted successfully.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                } catch (err) {
                    Swal.fire({
                        title: "Failed!",
                        text: "Something went wrong while deleting the course.",
                        icon: "error",
                        confirmButtonText: "Try Again",
                    });
                }
            }
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg font-medium">Loading your courses...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-lg max-w-md">
                    <p className="text-red-700 font-semibold">{error}</p>
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
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Added Courses</h1>
                            <p className="text-lg text-gray-600">Manage and track all your created courses</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white px-6 py-3 rounded-xl shadow-md border-2 border-indigo-100">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Total Courses</p>
                                        <p className="text-2xl font-bold text-indigo-600">{courses.length}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Courses Grid */}
                {courses.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                        <BookOpen className="mx-auto h-24 w-24 text-gray-300 mb-4" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No courses yet</h3>
                        <p className="text-gray-600 mb-6">Start creating amazing courses for your students!</p>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors shadow-lg">Create Your First Course</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course._id} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100">
                                {/* Course Image */}
                                <div className="relative h-48 overflow-hidden bg-linear-to-br from-indigo-500 to-purple-600">
                                    {course.thumbnail || course.image ? (
                                        <img
                                            src={course.thumbnail || course.image}
                                            alt={course.title || course.course_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <BookOpen className="h-20 w-20 text-white opacity-60" />
                                        </div>
                                    )}
                                    {/* Category Badge */}
                                    <div className="absolute top-3 right-3">
                                        <span className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg text-xs font-bold text-indigo-600">{course.category || "General"}</span>
                                    </div>
                                    {/* Overlay linear */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>

                                {/* Course Content */}
                                <div className="p-5">
                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors min-h-14">
                                        {course.title || course.course_name}
                                    </h3>

                                    {/* Description */}
                                    {course.description && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>}

                                    

                                    {/* Course Stats */}
                                    <div className="grid grid-cols-2 gap-3 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                                            <Users className="h-4 w-4 text-indigo-600 shrink-0" />
                                            <span className="text-sm font-medium">{course.studentsEnrolled || course.students_enrolled || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 rounded-lg p-2">
                                            <Clock className="h-4 w-4 text-indigo-600 shrink-0" />
                                            <span className="text-sm font-medium truncate">{course.duration || "Self-paced"}</span>
                                        </div>
                                    </div>

                                    {/* Price and Actions */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-baseline gap-1">
                                            <DollarSign className="h-5 w-5 text-green-600" />
                                            <span className="text-3xl font-bold text-gray-900">{course.price || "0"}</span>
                                        </div>

                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => alert("Edit functionality - Course ID: " + course._id)}
                                                className="p-2.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                title="Edit course"
                                            >
                                                <Edit className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(course._id)}
                                                className="p-2.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-all hover:scale-105 active:scale-95"
                                                title="Delete course"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
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

export default MyCourses;
