import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import IconSidebar from '../components/IconSidebar';

/**
 * MainLayout — light theme shell with a right-side control rail.
 * Used as a wrapper for authenticated page content.
 */
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col app-shell bg-background text-text-primary">
      <Navbar />
      <IconSidebar />

      <div className="flex flex-1">
        <main className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
