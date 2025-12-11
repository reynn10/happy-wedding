'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Guest } from '../types';
import { toast } from 'sonner';

export const useGuestBook = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false); // STATE BARU: Loading Simpan
  const [userId, setUserId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // --- MODAL STATE (ADD/EDIT) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGuest, setEditingGuest] = useState<Guest | null>(null);

  // --- MODAL STATE (DELETE) ---
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [guestToDelete, setGuestToDelete] = useState<number | null>(null);

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

  const formatPhone = (phone: string) => {
    let formatted = phone.replace(/\D/g, ''); 
    if (formatted.startsWith('0')) formatted = '62' + formatted.slice(1);
    return formatted;
  };

  const getWaLink = (guest: Guest) => {
    const phone = formatPhone(guest.phone);
    const invitationLink = `https://happywedding.com/invitation/demo?to=${encodeURIComponent(guest.name)}`;
    const message = `Kepada Yth. ${guest.name},%0A%0ATanpa mengurangi rasa hormat... (Link: ${invitationLink})`; 
    return `https://wa.me/${phone}?text=${message}`;
  };

  const handleImportContacts = async () => {
    if (!('contacts' in navigator && 'ContactsManager' in window)) {
      toast.error("Fitur ini hanya jalan di Chrome/Safari HP.");
      return;
    }

    let currentUserId = userId;
    if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            currentUserId = user.id;
            setUserId(user.id);
        } else {
            toast.error("Sesi habis. Login ulang.");
            return;
        }
    }

    try {
      const props = ['name', 'tel'];
      const opts = { multiple: true };
      // @ts-ignore
      const contacts = await navigator.contacts.select(props, opts);
      
      if (contacts.length > 0 && currentUserId) {
        const newGuests = contacts.map((c: any) => ({
          user_id: currentUserId,
          name: c.name[0],
          phone: c.tel ? c.tel[0] : "",
          category: "Kontak HP",
          status: "Pending",
          pax: 1
        }));

        const { error } = await supabase.from('guests').insert(newGuests);
        if (error) {
          toast.error("Gagal mengimpor kontak: " + error.message);
        } else {
          toast.success(`Berhasil mengimpor ${contacts.length} kontak!`);
          fetchGuests();
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleSendWA = (guest: Guest) => {
    if (!guest.phone) { toast.error("Nomor HP kosong."); return; }
    window.open(getWaLink(guest), '_blank');
    toast.success(`Membuka WhatsApp ke ${guest.name}`);
  };

  const handleBulkSend = () => {
    if (selectedIds.length === 0) return;
    const selectedGuests = guests.filter(g => selectedIds.includes(g.id));
    toast.info(`Mempersiapkan kirim ke ${selectedGuests.length} tamu...`);
    selectedGuests.forEach((guest) => {
        if(guest.phone) window.open(getWaLink(guest), '_blank');
    });
  };

  const handleExport = () => {
      window.print();
      toast.success("Siap dicetak!");
  };

  const handleAddGuest = () => {
    setEditingGuest(null); 
    setIsModalOpen(true);  
  };

  const handleEdit = (guest: Guest) => {
    setEditingGuest(guest); 
    setIsModalOpen(true);   
  };

  // --- FUNGSI SIMPAN (DIPERBAIKI) ---
  const saveGuest = async (name: string, phone: string, category: string, pax: number) => {
    setIsSaving(true); // Mulai Loading

    let currentUserId = userId;
    if (!currentUserId) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            currentUserId = user.id;
            setUserId(user.id);
        } else {
            toast.error("Sesi login habis. Silakan refresh.");
            setIsSaving(false);
            return;
        }
    }

    if (editingGuest) {
        // UPDATE
        const { error } = await supabase
            .from('guests')
            .update({ name, phone, category, pax })
            .eq('id', editingGuest.id);

        if (!error) {
            setGuests(guests.map(g => g.id === editingGuest.id ? { ...g, name, phone, category, pax } : g));
            toast.success("Data tamu diperbarui!");
        } else {
            toast.error("Gagal update: " + error.message);
        }
    } else {
        // INSERT
        const newGuest = { 
            user_id: currentUserId,
            name, 
            phone, 
            category, 
            status: "Pending", 
            pax 
        };
        const { data, error } = await supabase.from('guests').insert([newGuest]).select();
        
        if (!error && data) {
            setGuests([data[0], ...guests]);
            toast.success("Tamu berhasil ditambahkan!");
        } else {
            toast.error("Gagal menambah: " + error.message);
        }
    }
    setIsModalOpen(false); // Tutup modal setelah simpan
    setIsSaving(false); // Selesai Loading
  };

  // --- LOGIKA HAPUS YANG BARU (MODAL) ---
  
  // 1. Triggered saat tombol hapus di tabel diklik
  const handleDelete = (id: number) => {
    setGuestToDelete(id); // Set ID yang mau dihapus
    setIsDeleteModalOpen(true); // Buka modal konfirmasi
  };

  // 2. Eksekusi Hapus (Dipanggil dari Modal)
  const confirmDelete = async () => {
    if (!guestToDelete) return;

    // Optimistic update (Hapus dari layar dulu biar cepat)
    const previousGuests = [...guests];
    setGuests(guests.filter(g => g.id !== guestToDelete));
    setIsDeleteModalOpen(false); // Tutup modal segera
    
    const { error } = await supabase.from('guests').delete().eq('id', guestToDelete);
    
    if (error) {
        toast.error("Gagal menghapus: " + error.message);
        setGuests(previousGuests); // Revert data jika gagal
    } else {
        toast.success("Tamu berhasil dihapus.");
    }
    
    setGuestToDelete(null);
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
    guests, isLoading, isSaving, selectedIds, stats,
    // Add/Edit Modal
    isModalOpen, setIsModalOpen, editingGuest, saveGuest,
    // Delete Modal
    isDeleteModalOpen, setIsDeleteModalOpen, confirmDelete,
    // Actions
    handleImportContacts, handleSendWA, handleBulkSend, handleExport,
    handleAddGuest, handleDelete, handleEdit, toggleSelectAll, toggleSelect
  };
};