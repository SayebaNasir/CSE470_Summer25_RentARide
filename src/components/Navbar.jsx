//import React from 'react';

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { assets, menuLinks } from '../assets/assets';

const Navbar = ({ setShowLogin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const navBg = isHomePage ? 'bg-light' : 'bg-white';

  return (
    <nav className={`relative flex flex-row items-center justify-between py-4 px-6 md:px-14 lg:px-20 xl:px-28 text-gray-600 border-b border-borderColor transition-colors duration-200 ease-in-out ${isHomePage ? 'bg-light' : ''}`}>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className="w-44 h-[72px]" />
      </Link>

      <div
        className={`z-50 transition-transform ease-in-out duration-300 
          ${menuOpen ? 'max-sm:translate-x-0' : 'max-sm:translate-x-full'}
          max-sm:fixed max-sm:top-16 max-sm:right-0 max-sm:h-full max-sm:w-full
          max-sm:border-t border-borderColor max-sm:pt-6 max-sm:px-5 
          flex flex-col sm:flex-row gap-y-4 sm:gap-x-8 items-start sm:items-center ${navBg}`}
      >
        {menuLinks.map(({ path, name }, idx) => (
          <Link key={idx} to={path} className="text-base hover:underline">
            {name}
          </Link>
        ))}

        <div className='flex flex-col sm:flex-row gap-5 items-start sm:items-center'>
          <button onClick={() => navigate('/owner')} className='text-sm hover:text-primary transition'>
            Dashboard
          </button>
          <button
            onClick={() => setShowLogin(true)}
            className='bg-primary hover:bg-primary-dull text-white px-6 py-2 rounded-md transition'
          >
            Login
          </button>
        </div>
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className='sm:hidden focus:outline-none'
        aria-label='Toggle Menu'
      >
        <img
          src={menuOpen ? assets.close_icon : assets.menu_icon}
          alt='Menu Icon'
        />
      </button>
    </nav>
  );
};

export default Navbar;

