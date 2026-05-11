import Link from 'next/link';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/80">
      <div className="max-w-7xl mx-auto px-5 xl:px-0 py-14">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.70_0.15_76)]/20 border border-[oklch(0.70_0.15_76)]/30 flex items-center justify-center">
                <GraduationCap size={16} className="text-[oklch(0.70_0.15_76)]" />
              </div>
              <span className="font-playfair font-bold text-xl text-primary-foreground">
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
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              {['Features', 'All Modules', 'Pricing', 'Changelog', 'Roadmap'].map(l => (
                <li key={l}><a href="#" className="hover:text-[oklch(0.70_0.15_76)] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">Modules</h4>
            <ul className="space-y-2.5 text-sm">
              {['Students', 'Teachers', 'Attendance', 'Fee Management', 'Exams & Results', 'Notice Board'].map(l => (
                <li key={l}><a href="#" className="hover:text-[oklch(0.70_0.15_76)] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-primary-foreground text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              {['Documentation', 'API Reference', 'Community', 'Contact', 'Privacy Policy', 'Terms of Service'].map(l => (
                <li key={l}><a href="#" className="hover:text-[oklch(0.70_0.15_76)] transition-colors">{l}</a></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-primary-foreground/50">© 2024 EduCore. All rights reserved.</p>
          <p className="text-xs text-primary-foreground/50">Built with ❤️ for Bangladesh's schools</p>
        </div>
      </div>
    </footer>
  );
}
