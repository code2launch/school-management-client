"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap, ChevronDown } from "lucide-react";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "Modules", href: "#modules" },
  { label: "Pricing", href: "#pricing" },
  { label: "About Us", href: "#about" },
];

const resourcesLinks = [
  { label: "Documentation", href: "#docs" },
  { label: "Help Center", href: "#help" },
  { label: "Blog", href: "#blog" },
  { label: "Community", href: "#community" },
];

export default function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
        setIsResourcesOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm"
          : "bg-white/80 backdrop-blur-sm border-b border-slate-100"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-16 sm:h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
              <div className="flex h-8 w-8 sm:h-10 sm:w-10 md:h-11 md:w-11 items-center justify-center rounded-lg sm:rounded-xl bg-green-100 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                <GraduationCap className="h-4 w-4 sm:h-5 sm:w-5 text-green-700" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 leading-tight">
                  Edu<span className="text-green-700">Core</span>
                </h2>
                <p className="hidden sm:block text-[8px] sm:text-[10px] font-medium tracking-[1.5px] text-slate-400">
                  LEARNING MANAGEMENT SYSTEM
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="relative font-medium text-slate-600 transition-all duration-300 hover:text-green-700 group"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-green-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}

              {/* Resources Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className="flex items-center gap-1.5 font-medium text-slate-600 transition-all duration-300 hover:text-green-700 group"
                >
                  Resources
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-300 ${isResourcesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isResourcesOpen && (
                  <div
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                    className="absolute left-0 mt-3 w-48 rounded-xl bg-white shadow-xl border border-slate-100 py-2 origin-top transition-all duration-200"
                  >
                    {resourcesLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-slate-600 hover:bg-green-50 hover:text-green-700 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-4">

              <Link
                href="/login"
                className="rounded-xl bg-green-700 px-5 md:px-6 py-2.5 text-sm md:text-base font-semibold text-white shadow-lg shadow-green-200 transition-all duration-300 hover:bg-green-800 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-700"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Panel */}
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                  <GraduationCap className="h-5 w-5 text-green-700" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Edu<span className="text-green-700">Core</span>
                  </h2>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex-1 overflow-y-auto py-6">
              <div className="space-y-1 px-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                  >
                    {item.label}
                  </a>
                ))}

                {/* Resources Section in Mobile */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Resources
                  </h3>
                  {resourcesLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-3 rounded-lg text-base font-medium text-slate-600 hover:bg-green-50 hover:text-green-700 transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* Mobile Menu Footer */}
            <div className="border-t border-slate-100 p-5 space-y-3">

              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full rounded-xl bg-green-700 px-4 py-3 text-center font-semibold text-white transition-all duration-200 hover:bg-green-800 active:scale-95"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}