'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => router.pathname === path;

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
     
      <div className="flex items-center gap-3">
        <Image src="/logo.png" alt="Logo" width={44} height={44} className="rounded-full shadow-sm" />
        <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">CVCraft by Rushda</h1>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex gap-6">
        <Link
          href="/builder"
          className={`font-medium transition-colors duration-200 ${
            isActive('/builder') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          Home
        </Link>
        <Link
          href="/template"
          className={`font-medium transition-colors duration-200 ${
            isActive('/template') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
          }`}
        >
          Templates
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-2xl text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-16 right-6 bg-white border rounded-lg shadow-lg p-4 flex flex-col gap-4 w-40 md:hidden">
          <Link
            href="/builder"
            className={`font-medium transition-colors duration-200 ${
              isActive('/builder') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/template"
            className={`font-medium transition-colors duration-200 ${
              isActive('/template') ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            Templates
          </Link>
        </div>
      )}
    </header>
  );
}
