import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import HeaderDashboard from '../Components/HeaderDashboard';

const Dashboard = () => {
    return (
        <div>
            <HeaderDashboard></HeaderDashboard>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Dashboard;