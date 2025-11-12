import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import ErrorPage from "../Pages/ErrorPage";
import AllCourses from "../Pages/AllCourses";
import CourseDetails from "../Pages/CourseDetails";
import Dashboard from "../Layouts/Dashboard";
import MyEnrolledCourse from "../Pages/MyEnrolledCourse";
import MyAddedCourse from "../Pages/MyAddedCourse";
import AddCourse from "../Pages/AddCourse";
import PrivateRoute from "../Provider/PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeLayout></HomeLayout>,
        children: [
            {
                path: "/",
                element: <Home></Home>,
            },
            {
                path: "/courses",
                element: <AllCourses></AllCourses>,
            },
            {
                path: "/courses/:id",
                element: (
                    <PrivateRoute>
                        <CourseDetails></CourseDetails>
                    </PrivateRoute>
                ),
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <Dashboard></Dashboard>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <MyEnrolledCourse></MyEnrolledCourse>,
            },
            {
                path: "my-added-course",
                element: <MyAddedCourse></MyAddedCourse>,
            },
            {
                path: "add-course",
                element: <AddCourse></AddCourse>,
            },
        ],
    },
    {
        path: "/*",
        element: <ErrorPage></ErrorPage>,
    },
]);

export default router;
