import React, { useState } from "react";
import { Lock, ShieldCheck, Mail, UserCheck } from "lucide-react";
import { FormInput } from "../../components/FormInput";
import { Button } from "../../components/Button";
import { toast } from "../../utils/toast";

 const AdminSettings=()=> {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) return toast.error("Validation Error", "Fill all fields.");
    if (form.newPassword !== form.confirmPassword) return toast.error("Mismatch", "Passwords do not match.");
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Success", "Password updated successfully!");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }, 800);
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm">
        <h1 className="text-xl font-bold tracking-wider text-[var(--color-text-dark)] uppercase">Settings</h1>
        <p className="text-xs text-[var(--color-muted)] mt-0.5">Manage your admin profile and store preferences.</p>
      </div>

      <div className="p-6 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm space-y-4">
        <h2 className="text-base font-bold text-[var(--color-text-dark)] flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-[var(--color-accent)]" /> Admin Account</h2>
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[var(--color-border)]">
  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--color-border)]">
    <Mail className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase">Email:</span>
      <span className="text-xs font-semibold text-[var(--color-text-dark)]">homenmorestudio@gmail.com</span>
    </div>
  </div>

  <div className="flex items-center gap-3 p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-[var(--color-border)]">
    <UserCheck className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-bold text-[var(--color-muted)] uppercase">Role:</span>
      <span className="text-xs font-semibold text-[var(--color-accent)] uppercase">Admin</span>
    </div>
  </div>
</div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[var(--color-card-bg)] border border-[var(--color-border)] shadow-sm space-y-4">
        <h2 className="text-base font-bold text-[var(--color-text-dark)] flex items-center gap-2"><Lock className="w-5 h-5 text-[var(--color-accent)]" /> Change Password</h2>
        <div className="space-y-4 pt-2 border-t border-[var(--color-border)]">
          <FormInput label="Current Password" type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} placeholder="••••••••" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)] text-[var(--color-text-dark)]" labelClassName="!text-[var(--color-text-dark)]" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="New Password" type="password" name="newPassword" value={form.newPassword} onChange={handleChange} placeholder="••••••••" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)] text-[var(--color-text-dark)]" labelClassName="!text-[var(--color-text-dark)]" />
            <FormInput label="Confirm New Password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" className="!bg-[var(--color-card-bg)] !border-[var(--color-border)] text-[var(--color-text-dark)]" labelClassName="!text-[var(--color-text-dark)]" />
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={loading} className="!px-6 !py-2.5 text-xs font-bold rounded-xl bg-[var(--color-accent)] text-white">{loading ? "Updating..." : "Update Password"}</Button>
        </div>
      </form>
    </div>
  );
}
export default AdminSettings;