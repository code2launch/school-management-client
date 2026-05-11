'use client';

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
import {
  GraduationCap,
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useState } from 'react';

import { useLoginMutation } from '@/redux/features/auth/authApi';
import { setCredentials } from '@/redux/features/auth/authSlice';

interface LoginData {
  phone: string;
  password: string;
}

const DEMO_ROLES = [
  {
    label: 'Admin',
    phone: '01700000000',
    pw: 'Admin@1234',
  },
  {
    label: 'Teacher',
    phone: '01711111111',
    pw: 'Teacher@1234',
  },
];

const FEATURES = [
  'Attendance & fee automation',
  'Role-based secure dashboard',
  'Exam & result management',
  'Built for Bangladeshi schools',
];

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPw, setShowPw] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginData>();

  const onSubmit = async (data: LoginData) => {
    try {
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const res = (await login(data).unwrap()) as any;

      if (res.success) {
        dispatch(
          setCredentials({
            user: res.data.user,
            token: res.data.accessToken,
          })
        );

        toast.success('Welcome back!');

        const role = res.data.user.role;

        router.push(
          role === 'ADMIN'
            ? '/admin'
            : role === 'TEACHER'
              ? '/teacher'
              : '/student'
        );
      } else {
        toast.error(res.message || 'Login failed');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#f8fafc]">

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">
        <div className="grid w-full overflow-hidden rounded-[36px] border border-slate-200 bg-white shadow-[0_20px_80px_rgba(15,23,42,0.06)] lg:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative hidden overflow-hidden bg-[#071437] p-12 lg:flex lg:flex-col lg:justify-between">

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500/10 ring-1 ring-white/10">
                  <GraduationCap
                    size={22}
                    className="text-green-400"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-black text-white">
                    Edu<span className="text-green-400">Core</span>
                  </h2>

                  <p className="text-xs uppercase tracking-[3px] text-white/40">
                    School Management System
                  </p>
                </div>
              </Link>
            </div>

            {/* content */}
            <div className='h-full flex items-center'>
              <div className="relative z-10 ">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Trusted by 500+ Schools
                </div>

                <p className="mt-6 max-w-md text-lg leading-8 text-white/60">
                  Manage students, attendance, fees, exams and
                  communication from one clean and powerful
                  platform.
                </p>

                <div className="mt-10 space-y-4">
                  {FEATURES.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500/10">
                        <CheckCircle2
                          size={16}
                          className="text-green-400"
                        />
                      </div>

                      <span className="text-white/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>


          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center p-6 sm:p-10 lg:p-14">
            <div className="w-full max-w-md">
              {/* mobile logo */}
              <div className="mb-10 flex justify-center lg:hidden">
                <Link
                  href="/"
                  className="inline-flex items-center gap-3"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                    <GraduationCap
                      size={22}
                      className="text-green-700"
                    />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-slate-900">
                      Edu<span className="text-green-600">Core</span>
                    </h2>

                    <p className="text-xs uppercase tracking-[3px] text-slate-400">
                      School Management
                    </p>
                  </div>
                </Link>
              </div>

              {/* heading */}
              <div className="mb-8">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                  <ShieldCheck size={16} />
                  Secure Login Portal
                </div>

                <h2 className="text-4xl font-black text-slate-900">
                  Welcome Back
                </h2>

                <p className="mt-3 text-slate-500">
                  Sign in to access your school dashboard.
                </p>
              </div>

              {/* demo accounts */}
              <div className="mb-8 grid grid-cols-2 gap-3">
                {DEMO_ROLES.map((role) => (
                  <button
                    key={role.label}
                    type="button"
                    onClick={() => {
                      setValue('phone', role.phone);
                      setValue('password', role.pw);
                    }}
                    className="group rounded-lg border border-slate-200 bg-slate-50 py-2 text-left transition-all hover:border-green-200 hover:bg-green-50"
                  >
                    <p className="text-xs font-medium text-slate-400 text-center">
                      Demo {role.label} Account
                    </p>


                  </button>
                ))}
              </div>

              {/* form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
              >
                {/* phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone Number
                  </label>

                  <input
                    {...register('phone', {
                      required: 'Phone is required',
                    })}
                    placeholder="01700000000"
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                  />

                  {errors.phone && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* password */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <div className="relative">
                    <input
                      {...register('password', {
                        required: 'Password is required',
                      })}
                      type={showPw ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-5 pr-14 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPw(!showPw)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                    >
                      {showPw ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300"
                    />
                    Remember me
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-green-700 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-green-600 text-sm font-semibold text-white transition-all hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight
                        size={18}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* footer */}
              <p className="mt-8 text-center text-sm text-slate-500">
                Need help?{' '}
                <a
                  href="mailto:code2launch.co@gmail.com"
                  className="font-medium text-green-700 hover:underline"
                >
                  Contact support
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}