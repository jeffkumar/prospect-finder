"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  return (
    <nav className="bg-navbar p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" alt="Adventure Flow Logo" className="w-12 h-12 logo-invert" />
        </div>

        <ul className="hidden md:flex gap-6">
          <li>
            <Link href="/" className="text-contrast hover:text-secondary font-semibold">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-contrast hover:text-secondary font-semibold">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-contrast hover:text-secondary font-semibold">
              Contact
            </Link>
          </li>
          <li>
            <a
              href="https://app.adventureflow.ai"
              className="text-contrast hover:text-secondary font-semibold"
            >
              Flowchat
            </a>
          </li>
          <li>
            <Link href="/contact" className="bg-accent text-contrast py-2 px-4 rounded-lg shadow-md hover:bg-secondary transition duration-300">
              Book a Free Call
            </Link>
          </li>
        </ul>

        <div className="md:hidden">
          <button
            type="button"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
            className="text-contrast hover:text-secondary"
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <ul className="md:hidden flex flex-col gap-4 mt-4 px-4">
          <li>
            <Link href="/" className="text-contrast hover:text-secondary font-semibold" onClick={toggleMobileMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-contrast hover:text-secondary font-semibold" onClick={toggleMobileMenu}>
              About
            </Link>
          </li>
          <li>
            <Link href="/contact" className="text-contrast hover:text-secondary font-semibold" onClick={toggleMobileMenu}>
              Contact
            </Link>
          </li>
          <li>
            <a
              href="https://app.adventureflow.ai"
              className="text-contrast hover:text-secondary font-semibold"
              onClick={toggleMobileMenu}
            >
              Flowchat
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}


