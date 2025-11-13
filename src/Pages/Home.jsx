import React from "react";
import PopularCourse from "../Components/PopularCourse";
import Banner from "../Components/Banner";
import WhyChooseUs from "../Components/WhyChooseUs";
import TopInstructors from "../Components/TopInstructors";
import ThemeToggle from "../Components/ThemeToggle";

const Home = () => {
    return (
        <div className="relative bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="fixed bottom-6 right-6 z-50">
                <ThemeToggle />
            </div>
            <Banner />
            <PopularCourse />
            <WhyChooseUs />
            <TopInstructors />
        </div>
    );
};

export default Home;
