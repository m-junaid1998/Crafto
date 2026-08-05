import React, { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { GoogleLogin } from "@react-oauth/google";
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";
import { validateEmptyObject } from "../utils/helper";
import { useAuth } from "../hooks/useAuth";
import { toast } from "../utils/toast";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { loginUser, googleLoginUser, isAuthLoading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = schema.safeParse(form);
    if (!res.success) {
      const errs: Record<string, string> = {};
      res.error.issues.forEach((i) => i.path[0] && (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return toast.error("Validation Error", res.error.issues[0].message);
    }
    const result = await loginUser(validateEmptyObject(form));
    if (result?.success) navigate("/");
  };

  return (
    <div className="mt-auto flex items-center justify-center p-4 bg-[var(--color-bg-light)]">
      <div className="w-full max-w-md p-4 rounded-3xl bg-white border border-[var(--color-border)] shadow-xl space-y-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-serif text-[var(--color-text-dark)]">Sign In</h1>
          <p className="text-xs text-[var(--color-muted)]">Enter your details to access your account</p>
        </div>

        {/* Official Google Button with ID Token support */}
        <div className="flex justify-center w-full">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              if (credentialResponse.credential) {
                const res = await googleLoginUser(credentialResponse.credential);
                if (res?.success) navigate("/");
              }
            }}
            onError={() => toast.error("Google Auth", "Login Failed")}
            shape="pill"
            width="100%"
          />
        </div>

        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-[var(--color-border)]" />
          <span className="absolute bg-white px-3 text-[10px] font-bold text-[var(--color-muted)] uppercase">or email</span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <FormInput label="Email Address" type="email" name="email" value={form.email} onChange={handleChange} error={errors.email} placeholder="name@gmail.com" leftIcon={<Mail className="w-4 h-4 text-[var(--color-muted)]" />} className="!bg-[var(--color-card-bg)] !border-[var(--color-border)] text-[var(--color-text-dark)]" />
          <FormInput label="Password" type="password" name="password" value={form.password} onChange={handleChange} error={errors.password} placeholder="••••••••" leftIcon={<Lock className="w-4 h-4 text-[var(--color-muted)]" />} className="!bg-[var(--color-card-bg)] !border-[var(--color-border)] text-[var(--color-text-dark)]" />
          <Button type="submit" disabled={isAuthLoading} className="w-full !py-3 text-xs font-bold rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white disabled:opacity-50">
            <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap">{isAuthLoading ? "Signing In..." : "Sign In"}{!isAuthLoading && <ArrowRight className="w-4 h-4 shrink-0" />}</span>
          </Button>
        </form>

        <p className="text-center text-xs text-[var(--color-muted)]">Don't have an account? <Link to="/signup" className="font-bold text-[var(--color-accent)]">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;