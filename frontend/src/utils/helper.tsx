import { toast } from "sonner";

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 300) => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), delay); };
};

export const slugify = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

export const formatLabel = (key: string): string => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str: string) => str?.toUpperCase());
};

export const validateEmptyObject = <T extends Record<string, any>>(obj: T): T => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Invalid object provided.");
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (
        value === null ||
        value === undefined ||
        (typeof value === "string" && value.trim() === "")
      ) {
        toast.error(`Please enter ${formatLabel(key)}`);
        throw new Error(`Please enter ${formatLabel(key)}`);
      }
    }
  }

  return obj;
};