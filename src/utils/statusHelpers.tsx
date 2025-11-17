// src/utils/admin/statusHelpers.ts
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export const getStatusIcon = (status: string) => {
  switch (status) {
    case "PENDING":
      return <Clock className="h-5 w-5 text-warning" />;
    case "COMPLETED":
      return <CheckCircle className="h-5 w-5 text-success" />;
    case "FAILED":
      return <XCircle className="h-5 w-5 text-error" />;
    default:
      return <AlertTriangle className="h-5 w-5 text-gray-400" />;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case "PENDING":
      return "text-warning bg-warning/10";
    case "COMPLETED":
      return "text-success bg-success/10";
    case "FAILED":
      return "text-error bg-error/10";
    default:
      return "text-gray-500 bg-gray-100 dark:bg-gray-800";
  }
};

export const getColorClasses = (color: "blue" | "green" | "yellow" | "purple" | "red") => {
  const colors = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
    yellow: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',

  };
  return colors[color as keyof typeof colors] || colors.blue;
};