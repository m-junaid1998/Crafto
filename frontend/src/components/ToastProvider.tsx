import { useEffect, useState } from "react";
import { Toaster as SonnerToaster } from "sonner";

export const ToastProvider = () => {
  const [pos, setPos] = useState<"top-right" | "bottom-right">("bottom-right");
  useEffect(() => {
    const update = () => setPos(window.innerWidth < 640 ? "bottom-right" : "top-right");
    update(); window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return <SonnerToaster position={pos} toastOptions={{ unstyled: true }} />;
};