import { MapPin, Phone, Mail, Globe, GraduationCap } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
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

const usefulLinks = [
  { name: "Student Portal", href: "/portal/student" },
  { name: "Parent Portal", href: "/portal/parent" },
  { name: "Library", href: "/library" },
  { name: "Career", href: "/career" },
  { name: "Privacy Policy", href: "/privacy" },
];

const socialLinks = [
  { icon: FaFacebook, href: "#", label: "Facebook" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
];

export default function HomeFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#06184f] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">

          {/* Brand Column */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                <GraduationCap className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <h2 className="text-sm font-black leading-tight">GREENFIELD</h2>
                <p className="text-[8px] tracking-[1.5px] text-slate-300">
                  HIGH SCHOOL
                </p>
              </div>
            </div>
            <p className="mb-4 text-xs leading-5 text-slate-300">
              Dedicated to nurturing young minds and building future leaders.
            </p>
            <div className="flex gap-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="rounded-full bg-white/10 p-1.5 transition hover:bg-white/20"
                    aria-label={social.label}
                  >
                    <Icon size={12} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold">Quick Links</h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-yellow-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-3 text-sm font-bold">Useful Links</h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {usefulLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-yellow-400 transition">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-bold">Contact Us</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex gap-2">
                <MapPin size={12} className="mt-0.5" />
                <span>Mirpur, Dhaka-1216</span>
              </div>
              <div className="flex gap-2">
                <Phone size={12} className="mt-0.5" />
                <span>+880 1712 345 678</span>
              </div>
              <div className="flex gap-2">
                <Mail size={12} className="mt-0.5" />
                <span>info@greenfield.edu.bd</span>
              </div>
              <div className="flex gap-2">
                <Globe size={12} className="mt-0.5" />
                <span>Mon - Fri | 9:00 AM - 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-3 text-sm font-bold">Newsletter</h3>
            <p className="mb-3 text-xs leading-5 text-slate-300">
              Subscribe for latest updates.
            </p>
            <input
              type="email"
              placeholder="Your email"
              className="mb-2 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-xs outline-none placeholder:text-slate-400 focus:border-yellow-400"
            />
            <button className="w-full rounded-lg bg-yellow-400 px-3 py-2 text-xs font-bold text-slate-900 transition hover:bg-yellow-500">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row justify-between gap-2 px-4 sm:px-6 py-4 text-xs text-slate-400">
          <p>© {currentYear} Greenfield High School. All Rights Reserved.</p>
          <p>Powered by
            <Link href="https://www.code2launch.co/" target="_blank" className="ml-1 font-bold text-slate-300 hover:text-yellow-400 transition underline">
              Code2Launch
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}