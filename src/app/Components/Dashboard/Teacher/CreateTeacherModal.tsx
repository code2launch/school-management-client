/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useForm } from 'react-hook-form';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import { useCreateTeacherMutation } from '@/redux/features/teacher/teacherApi';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CreateTeacherModal({
  open,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  const [createTeacher, { isLoading }] =
    useCreateTeacherMutation();

  const onSubmit = async (data: any) => {
    try {
      await createTeacher(data).unwrap();

      toast.success('Teacher created successfully.');

      reset();
      onClose();
    } catch (err: any) {
      toast.error(
        err?.data?.message || 'Failed to create teacher.'
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h2 className="text-lg font-bold">
              Add Teacher
            </h2>
            <p className="text-sm text-muted-foreground">
              Create a new teacher account
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 space-y-5"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field
              label="Full Name"
              register={register('name')}
            />

            <Field
              label="Phone"
              register={register('phone')}
            />

            <Field
              label="Email"
              register={register('email')}
              type="email"
            />

            <Field
              label="Gender"
              register={register('gender')}
            />

            <Field
              label="Join Date"
              register={register('joinDate')}
              type="date"
            />

            <Field
              label="Password"
              register={register('password')}
              type="password"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Address
            </label>

            <textarea
              {...register('address')}
              rows={3}
              className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-border text-sm"
            >
              Cancel
            </button>

            <button
              disabled={isLoading}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
            >
              {isLoading && (
                <Loader2
                  size={15}
                  className="animate-spin"
                />
              )}

              Create Teacher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  register,
  type = 'text',
}: any) {
  return (
    <div>
      <label className="text-sm font-medium mb-2 block">
        {label}
      </label>

      <input
        type={type}
        {...register}
        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}