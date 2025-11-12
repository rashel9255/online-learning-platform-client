import React from 'react';
import PopularCourse from '../Components/PopularCourse';
import Banner from '../Components/Banner';
import WhyChooseUs from '../Components/WhyChooseUs';
import TopInstructors from '../Components/TopInstructors';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCourse></PopularCourse>
            <WhyChooseUs></WhyChooseUs>
            <TopInstructors></TopInstructors>
        </div>
    );
};

export default Home;