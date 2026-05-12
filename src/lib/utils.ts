import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export const formatCurrency = (
  amount: number | string | undefined | null,
): string => {
  // Handle undefined, null, or empty values
  if (amount === undefined || amount === null || amount === "") {
    return "৳0";
  }

  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  // Check if it's a valid number
  if (isNaN(numAmount)) {
    return "৳0";
  }

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numAmount);
};

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getRoleBadgeColor(role: string) {
  const map: Record<string, string> = {
    ADMIN:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    TEACHER: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    STUDENT:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    PARENT:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  };
  return map[role] ?? "bg-gray-100 text-gray-700";
}

export function getAttendanceColor(status: string) {
  const map: Record<string, string> = {
    PRESENT: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    ABSENT: "text-red-600 bg-red-50 dark:bg-red-900/20",
    LATE: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    LEAVE: "text-blue-600 bg-blue-50 dark:bg-blue-900/20",
  };
  return map[status] ?? "text-gray-600";
}

export function getPaymentStatusColor(status: string) {
  const map: Record<string, string> = {
    PAID: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20",
    UNPAID: "text-red-600 bg-red-50 dark:bg-red-900/20",
    PARTIAL: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
  };
  return map[status] ?? "text-gray-600";
}
