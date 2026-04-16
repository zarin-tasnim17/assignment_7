import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, Clock, BarChart2, PlaySquare, Globe, MessageCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import logo from '../assets/logo.png'; 


const Layout = () => {
  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-keenDark text-white' : 'text-gray-600 hover:bg-gray-100'
    }`;

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Toaster position="bottom-right" />
      
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <img src={logo}></img>
            </div>
            <div className="flex items-center space-x-2">
              <NavLink to="/" className={navLinkClass}>
                <Home size={18} /> <span className="hidden sm:inline">Home</span>
              </NavLink>
              <NavLink to="/timeline" className={navLinkClass}>
                <Clock size={18} /> <span className="hidden sm:inline">Timeline</span>
              </NavLink>
              <NavLink to="/stats" className={navLinkClass}>
                <BarChart2 size={18} /> <span className="hidden sm:inline">Stats</span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-keenDark text-white py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4">KeenKeeper</h2>
          <p className="text-sm text-emerald-100/70 mb-8 text-center max-w-md">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          <div className="mb-8 text-center">
            <p className="text-sm mb-4">Social Links</p>
            <div className="flex gap-4 justify-center">
              
              <div className="w-8 h-8 rounded-full bg-white text-keenDark flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"><PlaySquare size={16} /></div>
              <div className="w-8 h-8 rounded-full bg-white text-keenDark flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"><Globe size={16} /></div>
              <div className="w-8 h-8 rounded-full bg-white text-keenDark flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors"><MessageCircle size={16} /></div>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-xs text-emerald-100/50 border-t border-emerald-700 pt-6">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="cursor-pointer hover:text-white">Privacy Policy</span>
              <span className="cursor-pointer hover:text-white">Terms of Service</span>
              <span className="cursor-pointer hover:text-white">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;