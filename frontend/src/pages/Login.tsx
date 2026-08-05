import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { toast } from "../utils/toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginSchema.safeParse(form);
    if (!res.success) {
      const fieldErrors: Record<string, string> = {};
      res.error.issues.forEach((i) => { if (i.path[0]) fieldErrors[i.path[0] as string] = i.message; });
      setErrors(fieldErrors);
      return toast.error("Validation Error", res.error.issues[0].message);
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); toast.success("Welcome Back!", "Logged in successfully."); }, 1000);
  };

  return (
    <div className="mt-auto flex items-center justify-center p-4 bg-[var(--color-bg-light)]">
      <div className="w-full max-w-md p-8 rounded-3xl bg-white border border-[var(--color-border)] shadow-xl space-y-5">
        <div className="text-center"><h1 className="text-2xl font-bold font-serif text-[var(--color-text-dark)]">Sign In</h1><p className="text-xs text-[var(--color-muted)]">Enter your details to access your account</p></div>
        <button type="button" onClick={() => toast.info("Google Sign In", "Redirecting...")} className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-card-bg)] text-xs font-semibold text-[var(--color-text-dark)] hover:bg-gray-100 cursor-pointer">
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>Sign in with Google
        </button>
        <div className="relative flex items-center justify-center"><div className="w-full border-t border-[var(--color-border)]"></div><span className="absolute bg-white px-3 text-[10px] font-bold text-[var(--color-muted)] uppercase">or email</span></div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormInput label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@gmail.com" leftIcon={<Mail className="w-4 h-4 text-[var(--color-muted)]" />} className="!bg-[var(--color-card-bg)] !border-[var(--color-border)] text-[var(--color-text-dark)]" />
          <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="••••••••" leftIcon={<Lock className="w-4 h-4 text-[var(--color-muted)]" />} className="!bg-[var(--color-card-bg)] !border-[var(--color-border)] text-[var(--color-text-dark)]" />
          <Button type="submit" disabled={loading} className="w-full !py-3 text-xs font-bold rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white"><span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">{loading ? "Signing In..." : "Sign In"}{!loading && <ArrowRight className="w-4 h-4 shrink-0" />}</span></Button>
        </form>
        <p className="text-center text-xs text-[var(--color-muted)]">Don't have an account? <Link to="/signup" className="font-bold text-[var(--color-accent)]">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;