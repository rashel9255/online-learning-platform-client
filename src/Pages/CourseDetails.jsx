import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router";

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axios
            .get(`http://localhost:3000/courses/${id}`)
            .then((res) => {
                setCourse(res.data);
                setError(null);
            })
            .catch((err) => {
                console.error("Error fetching course:", err);
                setError("Course not found or failed to load.");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading course details...</p>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <Link to="/courses" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Back to Courses
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <div>
                    <div className=" bg-gray-100 flex items-center justify-center p-6">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-60vh object-cover rounded" />
                    </div>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h1>
                        <p className="text-gray-600 mb-4">{course.description}</p>

                        <div className="flex items-center gap-4 mb-4">
                            <div>
                                <div className="text-sm text-gray-500">Instructor</div>
                                <div className="font-semibold text-gray-800">{course.instructor?.name}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Level</div>
                                <div className="font-semibold text-gray-800">{course.level}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500">Duration</div>
                                <div className="font-semibold text-gray-800">{course.duration}</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm text-gray-500">Price</div>
                            <div className="text-2xl font-bold text-gray-900">
                                ${course.price} <span className="text-sm text-gray-500 line-through">{course.originalPrice > course.price ? `$${course.originalPrice}` : ""}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800">Objectives</h3>
                            <ul className="list-disc list-inside text-gray-600 mt-2">
                                {course.objectives?.map((obj, idx) => (
                                    <li key={idx}>{obj}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800">Requirements</h3>
                            <ul className="list-disc list-inside text-gray-600 mt-2">
                                {course.requirements?.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800">Curriculum</h3>
                            <div className="text-gray-600 mt-2">
                                Sections: {course.curriculum?.sections} • Lectures: {course.curriculum?.lectures} • Total: {course.curriculum?.totalDuration}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">Enroll Now</button>
                            <Link to="/courses" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
