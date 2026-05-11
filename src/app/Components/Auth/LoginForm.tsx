'use client';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import { GraduationCap, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useLoginMutation } from '@/redux/features/auth/authApi';
import { setCredentials } from '@/redux/features/auth/authSlice';
import ThemeToggleButton from '@/components/ThemeToggleButton';

interface LoginData { phone: string; password: string }

const DEMO_ROLES = [
  { label: 'Admin', phone: '01700000000', pw: 'Admin@1234', color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800' },
  { label: 'Teacher', phone: '01711111111', pw: 'Teacher@1234', color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800' },
];

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [showPw, setShowPw] = useState(false);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const res = await login(data).unwrap() as any;
      if (res.success) {
        dispatch(setCredentials({ user: res.data.user, token: res.data.accessToken }));
        toast.success('Welcome back!');
        const role = res.data.user.role;
        router.push(role === 'ADMIN' ? '/admin' : role === 'TEACHER' ? '/teacher' : '/student');
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="w-full max-w-4xl">
      {/* Top bar */}
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <GraduationCap size={16} className="text-primary-foreground" />
          </div>
          <span className="font-playfair font-bold text-lg">Edu<span className="text-[oklch(0.70_0.15_76)]">Core</span></span>
        </Link>
        <ThemeToggleButton />
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Left — branding */}
        <div className="hidden lg:block">
          <div className="relative bg-primary rounded-3xl p-10 overflow-hidden min-h-[500px] flex flex-col justify-between">
            <div className="absolute inset-0 hero-grid-bg opacity-20" />
            <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-[oklch(0.70_0.15_76)]/10 blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-playfair font-bold text-3xl text-white leading-tight mb-3">
                Managing your school
                <br />
                <span className="gradient-text-gold">just got easier.</span>
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Attendance, fees, exams, and communication — all in one platform built for Bangladesh.
              </p>
              <div className="space-y-3">
                {[
                  'Role-based dashboards for everyone',
                  'Works on any Android phone',
                  'Bangladesh curriculum & GPA system',
                  'Free to start, no credit card needed',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-white/75 text-sm">
                    <div className="w-5 h-5 rounded-full bg-[oklch(0.70_0.15_76)]/20 border border-[oklch(0.70_0.15_76)]/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[oklch(0.70_0.15_76)]" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {f}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative z-10 pt-8 border-t border-white/10">
              <p className="text-white/40 text-xs">Trusted by 500+ schools in Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
          <h1 className="font-playfair font-bold text-2xl text-foreground mb-1">Welcome back</h1>
          <p className="text-muted-foreground text-sm mb-7">Sign in to your EduCore dashboard</p>

          {/* Demo fill */}
          <div className="flex gap-2 mb-6">
            {DEMO_ROLES.map(r => (
              <button
                key={r.label}
                type="button"
                onClick={() => { setValue('phone', r.phone); setValue('password', r.pw); }}
                className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${r.color}`}
              >
                Demo {r.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
              <input
                {...register('phone', { required: 'Phone is required' })}
                placeholder="01700000000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground/60"
              />
              {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-2.5 pr-10 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow placeholder:text-muted-foreground/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? <><Loader2 size={15} className="animate-spin" /> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Need help? <a href="mailto:hello@educore.com.bd" className="text-primary hover:underline">Contact support</a>
          </p>
        </div>
      </div>
    </div>
  );
}
