'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Guest } from '../types';

export const useGuestBook = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // --- FETCH DATA ---
  const fetchGuests = async () => {
    setIsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
        setUserId(user.id);
        const { data, error } = await supabase
          .from('guests')
          .select('*')
          .eq('user_id', user.id)
          .order('id', { ascending: false });

        if (!error) setGuests(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // --- HELPERS ---
  const formatPhone = (phone: string) => {
    let formatted = phone.replace(/\D/g, ''); 
    if (formatted.startsWith('0')) {
        formatted = '62' + formatted.slice(1);
    }
    return formatted;
  };

  const getWaLink = (guest: Guest) => {
    const phone = formatPhone(guest.phone);
    const invitationLink = `https://happywedding.com/invitation/demo?to=${encodeURIComponent(guest.name)}`;
    const message = `Kepada Yth. ${guest.name},%0A%0ATanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i pada acara pernikahan kami.%0A%0ABerikut link undangan kami:%0A${invitationLink}%0A%0AMerupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.%0A%0ATerima kasih.`;
    return `https://wa.me/${phone}?text=${message}`;
  };

  // --- ACTIONS ---
  const handleImportContacts = async () => {
    if (!('contacts' in navigator && 'ContactsManager' in window)) {
      alert("Fitur ini khusus browser HP (Chrome/Safari Mobile).");
      return;
    }
    try {
      const props = ['name', 'tel'];
      const opts = { multiple: true };
      // @ts-ignore
      const contacts = await navigator.contacts.select(props, opts);
      if (contacts.length > 0 && userId) {
        const newGuests = contacts.map((c: any) => ({
          user_id: userId,
          name: c.name[0],
          phone: c.tel ? c.tel[0] : "",
          category: "Kontak HP",
          status: "Pending",
          pax: 1
        }));
        const { error } = await supabase.from('guests').insert(newGuests);
        if (!error) {
            alert(`Berhasil mengimpor ${contacts.length} kontak!`);
            fetchGuests();
        }
      }
    } catch (ex) { console.error(ex); }
  };

  const handleSendWA = (guest: Guest) => {
    if (!guest.phone) { alert("Nomor HP kosong."); return; }
    window.open(getWaLink(guest), '_blank');
  };

  const handleBulkSend = () => {
    if (selectedIds.length === 0) return;
    const selectedGuests = guests.filter(g => selectedIds.includes(g.id));
    if (confirm(`Kirim ke ${selectedGuests.length} tamu? Tab WhatsApp akan terbuka satu per satu.`)) {
       selectedGuests.forEach((guest) => {
          if(guest.phone) window.open(getWaLink(guest), '_blank');
       });
    }
  };

  const handleExport = () => window.print();

  const handleAddGuest = async () => {
    const newName = prompt("Masukkan Nama Tamu:");
    if (!newName) return;
    const newPhone = prompt("Masukkan Nomor WA (08xx):");
    if (userId) {
        const newGuest = { user_id: userId, name: newName, phone: newPhone || "", category: "Umum", status: "Pending", pax: 1 };
        const { error } = await supabase.from('guests').insert([newGuest]);
        if (!error) fetchGuests();
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Hapus tamu ini?")) {
      setGuests(guests.filter(g => g.id !== id));
      await supabase.from('guests').delete().eq('id', id);
    }
  };

  const handleEdit = (guest: Guest) => {
     const newName = prompt("Edit Nama:", guest.name);
     const newPhone = prompt("Edit No WA:", guest.phone);
     if (newName && userId) {
         setGuests(guests.map(g => g.id === guest.id ? { ...g, name: newName, phone: newPhone || "" } : g));
         supabase.from('guests').update({ name: newName, phone: newPhone }).eq('id', guest.id).then();
     }
  };

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(guests.map(g => g.id));
    else setSelectedIds([]);
  };

  const toggleSelect = (id: number) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(sid => sid !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const stats = {
    total: guests.length,
    confirmed: guests.filter(g => g.status === 'Hadir').length,
    pending: guests.filter(g => g.status === 'Pending').length,
    declined: guests.filter(g => g.status === 'Tidak Hadir').length,
  };

  return {
    guests, isLoading, selectedIds, stats,
    handleImportContacts, handleSendWA, handleBulkSend, handleExport,
    handleAddGuest, handleDelete, handleEdit, toggleSelectAll, toggleSelect
  };
};