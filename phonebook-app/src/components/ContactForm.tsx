'use client';

import { useState, useEffect } from 'react';
import { Contact } from '@/types/contact';
import { Plus, X, Save } from 'lucide-react';

interface ContactFormProps {
  initialData?: Contact | null;
  onSubmit: (data: Omit<Contact, 'id' | 'created_at'>) => Promise<void>;
  onCancel: () => void;
}

export default function ContactForm({ initialData, onSubmit, onCancel }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPhone(initialData.phone);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    
    setIsSubmitting(true);
    await onSubmit({ name, phone });
    setIsSubmitting(false);
    
    if (!initialData) {
      setName('');
      setPhone('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl space-y-5">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-white">
          {initialData ? 'Edit Contact' : 'Add New Contact'}
        </h2>
        {initialData && (
          <button type="button" onClick={onCancel} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="John Doe"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/25 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : initialData ? (
            <>
              <Save size={20} />
              <span>Save Changes</span>
            </>
          ) : (
            <>
              <Plus size={20} />
              <span>Add Contact</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
