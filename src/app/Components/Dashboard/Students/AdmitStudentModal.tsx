'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import {
  useAdmitStudentMutation,
} from '@/redux/features/student/studentApi';

import {
  useGetAllClassesQuery,
  useGetCurrentYearQuery,
  useGetSectionsByClassQuery,
} from '@/redux/features/school/schoolApi';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdmitStudentModal({
  open,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const selectedClass = watch('classId');

  const { data: yearData } = useGetCurrentYearQuery();
  const academicYearId = yearData?.data?.id;

  const { data: classesData } = useGetAllClassesQuery();
  const classes = classesData?.data ?? [];

  const { data: sectionData } = useGetSectionsByClassQuery(selectedClass, {
    skip: !selectedClass,
  });

  const sections = sectionData?.data ?? [];

  const [admitStudent, { isLoading }] = useAdmitStudentMutation();

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: any) => {
    try {
      await admitStudent({
        ...data,
        academicYearId,
        createParentLogin: Boolean(data.createParentLogin),
        createStudentLogin: Boolean(data.createStudentLogin),
      }).unwrap();

      toast.success('Student admitted successfully');
      onClose();
      reset();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to admit student');
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-card border border-border shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border sticky top-0 bg-card z-10">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Admit Student
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Add a new student to the school
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl hover:bg-accent flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Student Name
              </label>
              <input
                {...register('name', { required: true })}
                placeholder="Enter student name"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">Name is required</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Date of Birth
              </label>
              <input
                type="date"
                {...register('dob')}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Gender
              </label>

              <select
                {...register('gender')}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Roll Number
              </label>

              <input
                {...register('rollNumber')}
                placeholder="Enter roll number"
                className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Class
              </label>

              <select
                {...register('classId', { required: true })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Class</option>

                {classes.map((cls: any) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                Section
              </label>

              <select
                {...register('sectionId', { required: true })}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select Section</option>

                {sections.map((section: any) => (
                  <option key={section.id} value={section.id}>
                    {section.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Address
            </label>

            <textarea
              rows={3}
              {...register('address')}
              placeholder="Enter address"
              className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          <div className="border-t border-border pt-6">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Parent Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Parent Name
                </label>

                <input
                  {...register('parentName')}
                  placeholder="Enter parent name"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Parent Phone
                </label>

                <input
                  {...register('parentPhone')}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Relation
                </label>

                <select
                  {...register('parentRelation')}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Relation</option>
                  <option value="Father">Father</option>
                  <option value="Mother">Mother</option>
                  <option value="Guardian">Guardian</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-border pt-6">
            <label className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                {...register('createStudentLogin')}
                className="w-4 h-4 rounded border-border"
              />
              Create student login account
            </label>

            <label className="flex items-center gap-3 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                {...register('createParentLogin')}
                className="w-4 h-4 rounded border-border"
              />
              Create parent login account
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:bg-accent transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 disabled:opacity-60"
            >
              {isLoading && <Loader2 size={15} className="animate-spin" />}
              Admit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}