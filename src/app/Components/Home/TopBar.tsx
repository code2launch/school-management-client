"use client";

import { Phone, Mail, MapPin, LogIn } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";



export default function TopBar() {
  return (
    <div className="bg-[#06184f] text-white">
      <div className="mx-auto flex max-w-7xl items-start justify-between px-6 md:px-0 py-3 text-sm gap-6">
        <div className="flex flex-1 flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span>+880 1712 345 678</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail size={14} />
            <span>info@greenfield.edu.bd</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} />
            <span>Mirpur, Dhaka-1216</span>
          </div>
        </div>
        <Link href="/login"><LogIn size={15} /></Link>

        <div className="hidden items-center gap-5 lg:flex">

          <FaFacebook size={15} />
          <FaYoutube size={15} />
          <FaTwitter size={15} />
          <FaInstagram size={15} />
        </div>

      </div>
    </div>
  );
}