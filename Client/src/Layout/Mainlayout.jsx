import React from 'react';
import Navbar from '../Pages/Home/Shared/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../Pages/Home/Shared/Footer';

const MainLayout = () => {
  const location = useLocation();

  // Check if the current route is either login or register
  const isLoginOrRegister = location.pathname.includes('/login') || location.pathname.includes('/register');
  const isHome = location.pathname === '/';

  return (
    <div>
      {/* Render Navbar only if it's not on login or register pages */}
      {!isLoginOrRegister && <Navbar />}

      <div className={isHome || isLoginOrRegister ? '' : 'mt-24'}>
        <Outlet />
      </div>

      {/* Render Footer only if it's not on login or register pages */}
      {!isLoginOrRegister && <Footer />}
    </div>
  );
};

export default MainLayout;
