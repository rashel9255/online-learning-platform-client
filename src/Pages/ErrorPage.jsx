import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import errorImg from "../assets/error-404.png";

const ErrorPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "404 page Not Found";
    }, []);

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4 py-16">
            <div className="max-w-2xl w-full text-center">
                {/* Error Icon */}
                <div className="mb-8">
                    <div className="mx-auto w-32 h-32 bg-linear-to-br from-purple-400 to-indigo-600 rounded-full flex items-center justify-center mb-6">
                        <img src={errorImg} alt="404 Error" className="w-20 h-20 object-contain" />
                    </div>
                </div>

                {/* Error Message */}
                <div className="mb-8">
                    <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
                    <h2 className="text-3xl font-semibold text-gray-700 mb-4">Oops! Page Not Found</h2>
                    <p className="text-lg text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                    <button
                        onClick={handleGoHome}
                        className="btn bg-[linear-gradient(125deg,#632EE3_5.68%,#9F62F2_88.38%)] text-white border-none hover:from-purple-600 hover:to-indigo-700 px-8 py-3 rounded-full font-semibold"
                    >
                        🏠 Go Home
                    </button>
                    <button onClick={handleGoBack} className="btn border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white px-8 py-3 rounded-full font-semibold">
                        ← Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
