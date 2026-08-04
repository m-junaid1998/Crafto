import React from 'react';
import { FileText, CheckCircle2, Truck, RefreshCw, Headphones, Mail, Phone, MapPin } from 'lucide-react';

const TermsAndConditions: React.FC = () => (
  <div className="bg-[var(--color-bg-light)] text-[var(--color-text-dark)] min-h-screen py-12 px-4 sm:px-6 lg:px-8 font-sans">
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="text-center border-b border-[var(--color-border)] pb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-card-bg)] text-[var(--color-accent)] mb-3 shadow-xs">
          <FileText size={28} />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[var(--color-primary)]">Terms & Conditions</h1>
        <p className="mt-1 text-xs text-[var(--color-muted)] font-medium">Last Updated: August 2026</p>
      </header>

      <main className="space-y-6 text-sm text-[var(--color-text-dark)] leading-relaxed">
        <section className="bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-xs">
          <h2 className="text-base font-serif font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2"><CheckCircle2 size={16} className="text-[var(--color-accent)]" />Overview & Acceptance</h2>
          <p className="text-[var(--color-muted)]">By visiting or purchasing from <strong className="text-[var(--color-accent)]">Home N More</strong>, you agree to these terms. Please read them carefully before placing an order.</p>
        </section>

        <section className="bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-xs">
          <h2 className="text-base font-serif font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2"><Truck size={16} className="text-[var(--color-accent)]" />Pricing, Orders & Shipping</h2>
          <ul className="list-disc pl-5 space-y-1 text-[var(--color-muted)]">
            <li><strong>Prices:</strong> All prices are listed in PKR and are subject to change without prior notice.</li>
            <li><strong>Delivery:</strong> Standard delivery times range from 3-5 business days across Pakistan.</li>
          </ul>
        </section>

        <section className="bg-white p-5 rounded-xl border border-[var(--color-border)] shadow-xs">
          <h2 className="text-base font-serif font-bold text-[var(--color-primary)] mb-2 flex items-center gap-2"><RefreshCw size={16} className="text-[var(--color-accent)]" />Returns & Exchange Policy</h2>
          <p className="text-[var(--color-muted)]">Items can be returned or exchanged within 7 days of delivery if damaged or defective. Products must be unused and in original packaging.</p>
        </section>

        <section className="bg-[var(--color-card-bg)] p-5 rounded-xl border border-[var(--color-border)]">
          <h2 className="text-base font-serif font-bold text-[var(--color-primary)] mb-3 flex items-center gap-2"><Headphones size={16} className="text-[var(--color-accent)]" />Need Help? Contact Us</h2>
          <div className="space-y-2 text-xs sm:text-sm text-[var(--color-primary)] font-medium">
            <div className="flex items-center gap-2"><MapPin size={15} className="text-[var(--color-accent)] shrink-0" /><span>Shop No 1, First Floor, Shanghai Plaza, China Market, Rawalpindi</span></div>
            <div className="flex items-center gap-2"><Phone size={15} className="text-[var(--color-accent)] shrink-0" /><span>+92 335 9115702</span></div>
            <div className="flex items-center gap-2"><Mail size={15} className="text-[var(--color-accent)] shrink-0" /><span>support@homenmore.com</span></div>
          </div>
        </section>
      </main>
    </div>
  </div>
);

export default TermsAndConditions;