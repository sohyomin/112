'use client';

import { Contact } from '@/types/contact';
import { User, Phone, Trash2, Edit2 } from 'lucide-react';

interface ContactItemProps {
  contact: Contact;
  onDelete: (id: string) => void;
  onEdit: (contact: Contact) => void;
}

export default function ContactItem({ contact, onDelete, onEdit }: ContactItemProps) {
  return (
    <div className="group relative flex items-center justify-between p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/10 transition-all duration-300 overflow-hidden">
      <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
          <User size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white tracking-wide">{contact.name}</h3>
          <div className="flex items-center text-gray-400 mt-1 space-x-2">
            <Phone size={14} />
            <span className="text-sm font-medium">{contact.phone}</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onEdit(contact)}
          className="p-2 rounded-full bg-white/5 hover:bg-blue-500/20 text-gray-300 hover:text-blue-400 transition-colors"
          title="Edit"
        >
          <Edit2 size={18} />
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="p-2 rounded-full bg-white/5 hover:bg-red-500/20 text-gray-300 hover:text-red-400 transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
