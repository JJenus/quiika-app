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