import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#142152] text-white">
      <div className="max-w-7xl mx-auto px-5 xl:px-0 pt-14 pb-5">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.70_0.15_76)]/20 border border-[oklch(0.70_0.15_76)]/30 flex items-center justify-center">
                <GraduationCap size={16} className="text-[oklch(0.70_0.15_76)]" />
              </div>
              <span className="font-playfair font-bold text-xl ">
                Edu<span className="text-[oklch(0.70_0.15_76)]">Core</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-5">
              Modern, affordable school management for Bangladesh — built for teachers, trusted by admins.
            </p>
            <div className="flex flex-col gap-2 text-xs">
              <span className="flex items-center gap-2"><Mail size={13} /> hello@educore.com.bd</span>
              <span className="flex items-center gap-2"><Phone size={13} /> +880 1700-000000</span>
              <span className="flex items-center gap-2"><MapPin size={13} /> Dhaka, Bangladesh</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold  text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {['Features', 'All Modules', 'Pricing', 'Changelog', 'Roadmap'].map(l => (
                <li key={l}><a href="#" className="hover:text-green-500 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h4 className="font-semibold  text-sm mb-4">Modules</h4>
            <ul className="space-y-2.5 text-sm">
              {['Students', 'Teachers', 'Attendance', 'Fee Management', 'Exams & Results', 'Notice Board'].map(l => (
                <li key={l}><a href="#" className="hover:text-green-600 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold  text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {['Documentation', 'API Reference', 'Community', 'Contact', 'Privacy Policy', 'Terms of Service'].map(l => (
                <li key={l}><a href="#" className="hover:text-green-600 transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>© {currentYear} Code 2 Launch. All Rights Reserved.</p>
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
