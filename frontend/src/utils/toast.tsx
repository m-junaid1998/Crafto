import { toast as sonnerToast } from "sonner";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

interface ToastProps {
  id: string | number;
  message: string;
  description?: string;
  type: "success" | "error" | "info" | "warning";
}

const toastConfigs = {
  success: {
    icon: CheckCircle2,
    border: "border-emerald-500/30",
    iconColor: "text-emerald-400",
  },
  error: {
    icon: AlertCircle,
    border: "border-red-500/30",
    iconColor: "text-red-400",
  },
  info: {
    icon: Info,
    border: "border-blue-500/30",
    iconColor: "text-blue-400",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-amber-500/30",
    iconColor: "text-amber-400",
  },
};

const CustomToast = ({ id, message, description, type }: ToastProps) => {
  const config = toastConfigs[type];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-black border ${config.border} text-white shadow-xl w-full max-w-md`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon className={`w-4 h-4 shrink-0 ${config.iconColor}`} />
        <div className="flex items-center gap-2 text-xs truncate">
          <span className="font-bold text-gray-100 whitespace-nowrap">{message}</span>
          {description && (
            <>
              <span className="text-gray-600">•</span>
              <span className="text-white truncate">{description}</span>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => sonnerToast.dismiss(id)}
        className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all shrink-0 ml-2"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export const toast = {
  success: (message: string, description?: string) =>
    sonnerToast.custom((id) => <CustomToast id={id} message={message} description={description} type="success" />),

  error: (message: string, description?: string) =>
    sonnerToast.custom((id) => <CustomToast id={id} message={message} description={description} type="error" />),

  info: (message: string, description?: string) =>
    sonnerToast.custom((id) => <CustomToast id={id} message={message} description={description} type="info" />),

  warning: (message: string, description?: string) =>
    sonnerToast.custom((id) => <CustomToast id={id} message={message} description={description} type="warning" />),

  promise: <T,>(
    promise: Promise<T>,
    messages: { loading: string; success: string; error: string }
  ) => sonnerToast.promise(promise, messages),
};