import { BookOpen, Menu, X, User, LogIn } from "lucide-react";
import React, { use, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import logoImg from "../assets/patshala360-logo.png";
import { AuthContext } from "../Context/AuthContext";
import { toast, ToastContainer } from "react-toastify";
import { CiLogout } from "react-icons/ci";

const HeaderDashboard = () => {
    const navigate = useNavigate();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { logOutUser } = use(AuthContext);

    const handleLogOut = () => {
        logOutUser()
            .then(() => {
                toast.success("LogOut Successfully");
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const navLinks = (
        <>
            <li>
                <NavLink to="/dashboard" className="hover:text-primary">
                    My Courses
                </NavLink>
            </li>
            <li>
                <NavLink to="my-added-course" className="hover:text-primary">
                    My Added Course
                </NavLink>
            </li>
            <li>
                <NavLink to="add-course" className="hover:text-primary">
                    Add Course
                </NavLink>
            </li>
        </>
    );

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100">
            <ToastContainer />
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div onClick={() => navigate("/")} className="flex items-center space-x-2 group cursor-pointer">
                        <img src={logoImg} alt="patshala360 logo" className="w-20 h-20 object-contain" />
                        <span className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">PathShala360</span>
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex items-center space-x-4">{navLinks}</ul>

                    {/* Desktop CTA Buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <button
                                onClick={handleLogOut}
                                className="flex items-center space-x-2 px-5 py-2.5 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 rounded-lg hover:bg-gray-50 cursor-pointer"
                            >
                                <CiLogout className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors duration-200" aria-label="Toggle menu">
                        {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"}`}>
                    <ul className="space-y-2 pt-4">{navLinks}</ul>
                        <div className="pt-4 space-y-4 border-t border-gray-100 mt-4">
                            <button
                                onClick={handleLogOut}
                                className="w-full flex items-center justify-center space-x-2 px-4 py-3 text-gray-700 border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-200 font-medium cursor-pointer mb-2"
                            >
                                <CiLogout className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderDashboard;
