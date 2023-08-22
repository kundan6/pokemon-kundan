import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 py-4 px-5 text-center mb-10">
      <Link to="/" className="font-space text-2xl font-bold text-red-50">
        Pokemon
      </Link>
    </nav>
  );
};
