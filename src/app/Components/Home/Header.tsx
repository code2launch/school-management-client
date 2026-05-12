"use client";

import { useState, useEffect } from "react";
import { Menu, X, GraduationCap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Admission", href: "/admission" },
  { name: "Notice Board", href: "/notices" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white backdrop-blur-md shadow-md transition-all duration-300">
        <div className="mx-auto max-w-7xl px-6 md:px-0">
          <div className="flex items-center justify-between py-3">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-xl bg-green-100 transition-transform group-hover:scale-105">
                <GraduationCap className="h-5 w-5 sm:h-8 sm:w-8 text-green-700" />
              </div>
              <div>
                <h1 className="text-sm sm:text-lg md:text-xl font-black text-green-700 leading-tight">
                  GREENFIELD
                </h1>
                <p className="text-[10px] sm:text-xs font-medium tracking-[2px] sm:tracking-[3px] text-slate-500">
                  HIGH SCHOOL
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setActiveLink(link.href)}
                  className={`relative font-medium transition-colors duration-300 hover:text-green-700 ${activeLink === link.href ? "text-slate-900" : "text-slate-600"
                    }`}
                >
                  {link.name}
                  {activeLink === link.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              href="/admission"
              className="hidden lg:inline-block rounded-xl bg-yellow-400 px-5 md:px-6 py-2.5 text-sm md:text-base font-semibold text-slate-900 transition-all hover:bg-yellow-500 hover:scale-105 active:scale-95"
            >
              Online Admission
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${isMobileMenuOpen ? "visible" : "invisible"
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                  <GraduationCap className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h1 className="text-sm font-black text-green-700">GREENFIELD</h1>
                  <p className="text-[8px] tracking-[1.5px] text-slate-500">
                    HIGH SCHOOL
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6">
              <div className="space-y-1 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => {
                      setActiveLink(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${activeLink === link.href
                      ? "bg-green-50 text-green-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-green-700"
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Footer CTA */}
            <div className="border-t border-slate-200 p-4">
              <Link
                href="/admission"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full rounded-xl bg-yellow-400 px-4 py-3 text-center font-semibold text-slate-900 transition-all hover:bg-yellow-500 active:scale-95"
              >
                Online Admission
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}