import React from 'react';
import PopularCourse from '../Components/PopularCourse';
import Banner from '../Components/Banner';
import WhyChooseUs from '../Components/WhyChooseUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularCourse></PopularCourse>
            <WhyChooseUs></WhyChooseUs>
        </div>
    );
};

export default Home;