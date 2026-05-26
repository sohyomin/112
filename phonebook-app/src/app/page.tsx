'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Contact } from '@/types/contact';
import ContactItem from '@/components/ContactItem';
import ContactForm from '@/components/ContactForm';
import { BookUser, AlertCircle, Loader2 } from 'lucide-react';

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error: sbError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (sbError) {
        if (sbError.message.includes('fetch failed') || sbError.message.includes('Invalid URL')) {
          throw new Error('Supabase URL or Key is invalid. Please check your .env.local file.');
        }
        throw sbError;
      }
      
      setContacts(data || []);
    } catch (err: any) {
      console.error('Error fetching contacts:', err);
      setError(err.message || 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (data: Omit<Contact, 'id' | 'created_at'>) => {
    try {
      setError(null);
      const { data: newContact, error: sbError } = await supabase
        .from('contacts')
        .insert([{ name: data.name, phone: data.phone }])
        .select()
        .single();

      if (sbError) throw sbError;
      
      if (newContact) {
        setContacts([newContact, ...contacts]);
      }
    } catch (err: any) {
      console.error('Error adding contact:', err);
      setError(err.message || 'Failed to add contact');
    }
  };

  const handleUpdate = async (data: Omit<Contact, 'id' | 'created_at'>) => {
    if (!editingContact) return;
    try {
      setError(null);
      const { error: sbError } = await supabase
        .from('contacts')
        .update({ name: data.name, phone: data.phone })
        .eq('id', editingContact.id);

      if (sbError) throw sbError;
      
      setContacts(contacts.map(c => 
        c.id === editingContact.id ? { ...c, ...data } : c
      ));
      setEditingContact(null);
    } catch (err: any) {
      console.error('Error updating contact:', err);
      setError(err.message || 'Failed to update contact');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return;
    try {
      setError(null);
      const { error: sbError } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (sbError) throw sbError;
      
      setContacts(contacts.filter(c => c.id !== id));
    } catch (err: any) {
      console.error('Error deleting contact:', err);
      setError(err.message || 'Failed to delete contact');
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-blue-500/30 relative overflow-hidden pb-20">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 pt-16 relative z-10">
        
        <header className="flex items-center space-x-4 mb-12">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg shadow-blue-500/20">
            <BookUser size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              Cloud Contacts
            </h1>
            <p className="text-gray-400 mt-1">Manage your phonebook effortlessly</p>
          </div>
        </header>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start space-x-3 text-red-400">
            <AlertCircle className="flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-300">Connection Error</h3>
              <p className="text-sm mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ContactForm 
                initialData={editingContact} 
                onSubmit={editingContact ? handleUpdate : handleAdd}
                onCancel={() => setEditingContact(null)}
              />
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-white">Your Contacts</h2>
              <span className="text-gray-400 text-sm bg-white/5 px-3 py-1 rounded-full border border-white/10">
                {contacts.length} Total
              </span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                <Loader2 className="animate-spin text-blue-500" size={40} />
                <p>Loading contacts...</p>
              </div>
            ) : contacts.length === 0 && !error ? (
              <div className="text-center py-20 px-6 bg-white/5 rounded-3xl border border-white/10 border-dashed">
                <BookUser size={48} className="mx-auto text-gray-500 mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-gray-300">No contacts yet</h3>
                <p className="text-gray-500 mt-2">Add your first contact using the form.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                {contacts.map((contact) => (
                  <ContactItem 
                    key={contact.id} 
                    contact={contact} 
                    onDelete={handleDelete}
                    onEdit={setEditingContact}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
