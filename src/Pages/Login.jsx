import React, { use, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Header from "../Components/Header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";

const Login = () => {
    const [error, setError] = useState();
    const [email, setEmail] = useState("");

    const { logInUser, signInWithGoogle } = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Pathshala360 | Login";
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const emailValue = e.target.email.value;
        const password = e.target.password.value;
        setEmail(emailValue);
        logInUser(emailValue, password)
            .then(() => {
                e.target.reset();
                toast.success("Login Successfully");
                setTimeout(() => {
                    navigate(`${location.state ? location.state : "/"}`);
                }, 1000);
            })
            .catch((error) => {
                const errorCode = error.code;
                setError(errorCode);
                toast.error("Login Failed",error);
            });
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(() => {
                toast.success("Login with Google successful!");
                setTimeout(() => {
                    navigate(`${location.state ? location.state : "/"}`);
                }, 1000);
            })
            .catch((error) => {
                console.error("Google sign-in error:", error);
                toast.error("Failed to sign in with Google. Please try again.");
            });
    };
    const handleForgotPassword = () => {
        navigate("/forgot-password", { state: { email } });
    };

    return (
        <div>
            <ToastContainer />
            <div className="flex justify-center min-h-screen items-center">
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
                    <h2 className="font-semibold text-2xl text-center">Login your account</h2>
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="fieldset">
                            {/* email  */}
                            <label className="label">Email</label>
                            <input name="email" type="email" className="input" placeholder="Email" required />
                            {/* passowrd  */}
                            <label className="label">Password</label>
                            <input name="password" type="password" className="input" placeholder="Password" required />
                            <div>
                                <button type="button" onClick={handleForgotPassword} className="link link-hover">
                                    Forgot password?
                                </button>
                            </div>

                            {error && <p className="text-red-500">{error}</p>}

                            <button type="submit" className="btn btn-neutral mt-4">
                                Login
                            </button>
                            <p className="font-semibold text-center pt-5">
                                Dont’t Have An Account ?{" "}
                                <Link className="text-secondary" to="/register">
                                    Register
                                </Link>
                            </p>
                        </fieldset>
                    </form>
                    <button onClick={handleGoogleSignIn} className="btn mx-6 bg-white text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <g>
                                <path d="m0 0H512V512H0" fill="#fff"></path>
                                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                            </g>
                        </svg>
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
