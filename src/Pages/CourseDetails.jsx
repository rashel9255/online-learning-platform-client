import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function CourseDetails() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isEnrolling, setIsEnrolling] = useState(false);

    const handleEnroll = () => {
        if (!user) {
            // if not logged in, go to login (user can be returned to this page by your PrivateRoute/state handling)
            navigate("/login", { state: { from: `/courses/${id}` } });
            return;
        }

        if (!course) return;

        // Prevent multiple enrollments
        if (isEnrolled || isEnrolling) {
            toast.info("You are already enrolled in this course or enrollment is in progress.");
            return;
        }

        setIsEnrolling(true);

        const newEnrollment = {
            courseId: course._id || id,
            userId: user.uid,
            userEmail: user.email,
            title: course.title,
            instructor: course.instructor,
            thumbnail: course.thumbnail,
            price: course.price,
        };

        axios
            .post("https://online-learning-platform-server-alpha.vercel.app/enrolled-courses", newEnrollment)
            .then((res) => {
                if (res.data.insertedId || res.status === 201) {
                    toast.success("Successfully enrolled in the course!");
                    setIsEnrolled(true);
                } else if (res.data.message) {
                    // Handle duplicate enrollment message from server
                    toast.info(res.data.message);
                    setIsEnrolled(true);
                } else {
                    // Some backends may return the new resource directly
                    setIsEnrolled(true);
                    toast.success("Successfully enrolled in the course!");
                }
            })
            .catch((err) => {
                console.error("Error enrolling in course:", err);
                if (err.response?.data?.message) {
                    toast.info(err.response.data.message);
                    setIsEnrolled(true);
                } else {
                    toast.error("Failed to enroll in the course.");
                }
            })
            .finally(() => {
                setIsEnrolling(false);
            });
    };

    useEffect(() => {
        if (course?.title) {
            document.title = `${course.title} - PathShala360`;
        }
    }, [course]);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        axios
            .get(`https://online-learning-platform-server-alpha.vercel.app/courses/${id}`)
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

    // check whether current user already enrolled
    useEffect(() => {
        if (!user || !id) return;
        // backend expected to support query by userId/userEmail and courseId
        const queryParam = user.uid ? `userId=${user.uid}&courseId=${id}` : `userEmail=${user.email}&courseId=${id}`;
        axios
            .get(`https://online-learning-platform-server-alpha.vercel.app/enrolled-courses?${queryParam}`)
            .then((res) => {
                // if the endpoint returns an array of enrollments
                if (Array.isArray(res.data) && res.data.length > 0) {
                    setIsEnrolled(true);
                } else if (res.data && (res.data.courseId || res.data.courseId === id)) {
                    // handle single object response
                    setIsEnrolled(true);
                }
            })
            .catch(() => {
                // silent fail — user is not enrolled or endpoint unsupported
            });
    }, [user, id]);

    if (loading)
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Loading course details...</p>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <div className="text-red-500 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Oops!</h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">{error}</p>
                    <Link to="/courses" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
                        Back to Courses
                    </Link>
                </div>
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <ToastContainer />
            <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div>
                    <div className="bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-6">
                        <img src={course.thumbnail} alt={course.title} className="w-full h-60vh object-cover rounded" />
                    </div>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>

                        <div className="flex items-center gap-4 mb-4">
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Instructor</div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{course.instructor?.name}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Level</div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{course.level}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
                                <div className="font-semibold text-gray-800 dark:text-gray-200">{course.duration}</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                ${course.price} <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{course.originalPrice > course.price ? `$${course.originalPrice}` : ""}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white">Objectives</h3>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                                {course.objectives?.map((obj, idx) => (
                                    <li key={idx}>{obj}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white">Requirements</h3>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 mt-2">
                                {course.requirements?.map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold text-gray-800 dark:text-white">Curriculum</h3>
                            <div className="text-gray-600 dark:text-gray-300 mt-2">
                                Sections: {course.curriculum?.sections} • Lectures: {course.curriculum?.lectures} • Total: {course.curriculum?.totalDuration}
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            {isEnrolled ? (
                                <button disabled className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed">
                                    Already Enrolled
                                </button>
                            ) : (
                                <button
                                    onClick={handleEnroll}
                                    disabled={isEnrolling}
                                    className={`${isEnrolling ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded-lg transition-colors`}
                                >
                                    {isEnrolling ? "Enrolling..." : "Enroll Now"}
                                </button>
                            )}
                            <Link to="/courses" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                                Back
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
