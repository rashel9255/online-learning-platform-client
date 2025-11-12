import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router";

const MyEnrolledCourse = () => {
    const { user } = useContext(AuthContext);
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
        axios
            .get(`http://localhost:3000/enrolled-courses?userId=${user.uid}`)
            .then((res) => {
                setEnrollments(Array.isArray(res.data) ? res.data : [res.data]);
                setError(null);
            })
            .catch((error) => {
                console.error("Failed to load enrolled courses", error);
                setError("Failed to load your enrolled courses");
            })
            .finally(() => setLoading(false));
    }, [user]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (!user)
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-4">Please log in</h2>
                    <Link to="/login" className="btn btn-primary">
                        Go to Login
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">My Enrolled Courses</h1>

                {error && <div className="bg-red-50 text-red-700 p-4 rounded mb-4">{error}</div>}

                {enrollments.length === 0 ? (
                    <div className="bg-white p-6 rounded shadow text-center">
                        <p className="mb-4">You have not enrolled in any courses yet.</p>
                        <Link to="/courses" className="btn btn-outline">
                            Browse Courses
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {enrollments.map((item) => (
                            <div key={item._id || item.courseId} className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
                                <img src={item.thumbnail} alt={item.title} className="w-32 h-20 object-cover rounded" />
                                <div className="flex-1">
                                    <h2 className="font-semibold text-lg">{item.title}</h2>
                                    <p className="text-sm text-gray-600">Instructor: {item.instructor?.name || item.instructor}</p>
                                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Link to={`/courses/${item.courseId}`} className="text-sm text-blue-600 underline">
                                        View Course
                                    </Link>
                                    <button className="text-sm bg-green-600 text-white px-3 py-1 rounded">Start Learning</button>
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
