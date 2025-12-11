'use client';

import React from 'react';
import { useGuestBook } from './hooks/useGuestBook';
import GuestHeader from './components/GuestHeader';
import GuestStats from './components/GuestStats';
import GuestTable from './components/GuestTable';
import GuestModal from './components/GuestModal';
import DeleteGuestModal from './components/DeleteGuestModal'; // Import Baru

export default function GuestBookPage() {
  const {
    guests, isLoading, selectedIds, stats, isSaving,
    // Modal Edit
    isModalOpen, setIsModalOpen, editingGuest, saveGuest,
    // Modal Delete (Ambil dari Hook)
    isDeleteModalOpen, setIsDeleteModalOpen, confirmDelete,
    // Actions
    handleImportContacts, handleSendWA, handleBulkSend, handleExport,
    handleAddGuest, handleDelete, handleEdit, toggleSelectAll, toggleSelect
  } = useGuestBook();

  return (
    <div className="space-y-8 animate-fade-in-up font-sans text-gray-800">
      <GuestHeader 
        onImport={handleImportContacts}
        onExport={handleExport}
        onAdd={handleAddGuest}
        onBulkSend={handleBulkSend}
        selectedCount={selectedIds.length}
      />

      <GuestStats stats={stats} />

      <GuestTable 
        guests={guests}
        isLoading={isLoading}
        selectedIds={selectedIds}
        onToggleSelectAll={toggleSelectAll}
        onToggleSelect={toggleSelect}
        onSendWA={handleSendWA}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onImport={handleImportContacts}
      />

      {/* Modal Tambah/Edit */}
      <GuestModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveGuest}
        editingGuest={editingGuest}
        isSaving={isSaving}
      />

      {/* Modal Hapus (Baru) */}
      <DeleteGuestModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}