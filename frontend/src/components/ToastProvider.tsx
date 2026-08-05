import { Toaster as SonnerToaster } from "sonner";

export const ToastProvider = () => {
  return (
    <SonnerToaster
      position="bottom-right"
      style={{ zIndex: 999999 }}
      toastOptions={{
        style: { zIndex: 999999 },
      }}
    />
  );
};