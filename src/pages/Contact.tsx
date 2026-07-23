import React, { useState } from 'react';
import { Mail, Phone, MapPin, User, MessageSquare, CheckCircle2, Store, Send } from 'lucide-react';
import { FormInput } from '../components/FormInput';
import { Button } from '../components/Button';
import { WhatsAppIcon } from '../utils/socialicons';

const INFO_CARDS = [
  { icon: <Mail size={22} />, title: 'Email', content: <a href="mailto:craftostore.pk@gmail.com" className="text-gray-800 font-medium text-sm hover:text-accent">craftostore.pk@gmail.com</a> },
  { icon: <Phone size={22} />, title: 'Phone / WhatsApp', content: <><p className="text-gray-800 font-semibold text-sm mb-2">0335 9115702</p><a href="https://wa.me/923359115702" target="_blank" rel="noreferrer" className="inline-flex items-center space-x-1.5 text-xs text-primary font-medium hover:underline"><WhatsAppIcon size={16} /><span>Chat on WhatsApp</span></a></> },
  { icon: <MapPin size={22} />, title: 'Location', content: <p className="text-gray-700 text-sm max-w-[220px] leading-relaxed">Shop No 1, First Floor, Shanghai Plaza, China Market, Rawalpindi</p> }
];

const FEATURES = [
  { title: 'Authentic', desc: 'Handmade by skilled Pakistani artisans' },
  { title: 'Nationwide Delivery', desc: 'Reaching all major cities in Pakistan' },
  { title: 'Cash on Delivery', desc: 'Pay when your order arrives' },
  { title: 'Secure Packaging', desc: 'Each piece packed with care' }
];

const Contact= () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-[#F7F5F0] pb-20">
      <section className="bg-primary text-white text-center pt-16 pb-28 px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-semibold mb-3 tracking-wide">Get in Touch</h1>
        <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed">We'd love to hear from you. Reach out with questions, custom orders, or just to say hello.</p>
      </section>

      <div className="max-w-6xl mx-auto px-4 md:px-8 -mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {INFO_CARDS.map((card, i) => (
            <div key={i} className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">{card.icon}</div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">{card.title}</h3>
              {card.content}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-5 bg-[#EFECE6] rounded-2xl p-6 md:p-8 flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-primary mb-1">Send Us a Message</h2>
              <p className="text-xs text-gray-600 mb-6">Fill out the form and we'll respond within 24 hours.</p>

              <form onSubmit={(e) => { e.preventDefault(); console.log(form); }} className="space-y-4">
                <FormInput label="Name" name="name" required placeholder="Your name" value={form.name} onChange={handleChange} leftIcon={<User size={16} />} />
                <FormInput label="Email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} leftIcon={<Mail size={16} />} />
                <FormInput label="Subject" name="subject" placeholder="How can we help?" value={form.subject} onChange={handleChange} leftIcon={<MessageSquare size={16} />} />
                
                <div className="w-full">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5 select-none">Message <span className="text-red-500 ml-0.5">*</span></label>
                  <textarea name="message" required rows={4} placeholder="Tell us more about your inquiry..." value={form.message} onChange={handleChange} className="w-full bg-white text-sm rounded-lg p-3.5 text-gray-800 border border-gray-200 transition-all outline-none focus:ring-1 focus:ring-primary focus:border-primary placeholder:text-gray-400 resize-none" />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" rightIcon={<Send size={15} />}>
                  Send Message
                </Button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#EFECE6] rounded-2xl p-8 md:p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6"><Store size={32} /></div>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-primary mb-8">Why Shop with Crafto?</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8 text-left w-full max-w-lg">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle2 size={18} className="text-[#C89B53] shrink-0 mt-0.5 fill-[#C89B53]/20" />
                  <div>
                    <h4 className="text-xs font-bold text-primary uppercase tracking-wide">{f.title}</h4>
                    <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export  default Contact;