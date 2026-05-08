'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus('sent');
      }}
    >
      {[
        { label: 'Full Name', type: 'text', placeholder: 'John Smith' },
        { label: 'Email', type: 'email', placeholder: 'john@example.com' },
        { label: 'Company', type: 'text', placeholder: 'Your company (optional)' },
      ].map(field => (
        <div key={field.label}>
          <label className="block text-sm text-white/60 mb-2">{field.label}</label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/60 transition-colors"
          />
        </div>
      ))}
      <div>
        <label className="block text-sm text-white/60 mb-2">Message</label>
        <textarea
          rows={5}
          placeholder="Tell us about your project, product needs, or questions..."
          className="w-full px-4 py-3 rounded-xl bg-dark-card border border-dark-border text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/60 transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-4 bg-brand-blue text-white font-semibold rounded-xl hover:bg-brand-blue/90 transition-all"
      >
        {status === 'sent' ? 'Message Sent! ✉️' : 'Send Message'}
      </button>
    </form>
  );
}