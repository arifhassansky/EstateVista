import React from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "../Pages/Dashboard/Sidebar";
const Dashboard = () => {
  return (
    <div className='relative min-h-screen flex bg-white'>
      <Sidebar/>
     
        <div className='flex-1'>
          <div className='p-5'>
            <Outlet></Outlet>
          </div>
        </div>
     
    </div>
  );
};

export default Dashboard;
