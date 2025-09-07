import React from 'react';
import { NavLink } from 'react-router-dom';
import { IEI_LOGO_IMG } from '../constants';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/events', label: 'Events' },
  { path: '/team', label: 'Team' },
  { path: '/contact', label: 'Contact Us' },
  { path: '/join', label: 'Join Us' },
];

const Header = () => {
  return (
    <header className="bg-brand-secondary/80 backdrop-blur-sm sticky top-0 z-50 shadow-lg shadow-brand-primary/10">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-3 transition-transform transform hover:scale-105">
              <img src={IEI_LOGO_IMG} alt="IEI Logo" className="h-10 w-10 object-contain bg-white p-1 rounded-md" />
              <span className="text-xl font-bold text-brand-text">IE(I)-SC RCCIIT</span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-110 after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-brand-primary after:transition-all after:duration-300 hover:after:w-full ${
                      isActive
                        ? 'bg-brand-primary text-white scale-110'
                        : 'text-brand-text-muted hover:bg-brand-secondary hover:text-white'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;