import { useExplorerStore } from '@/app/contexts/explorer.store';
import { useState } from 'react';

export const executeOnConfirm = (onConfirm: () => void) => (id?: string) => onConfirm();

export function hooks (onConfirm: () => void) {
  const [folderName, setFolderName] = useState('');
  const [error, setError] = useState('');
  const explorerStore = useExplorerStore();

  const handleConfirm = () => {
    onConfirm();
    setTimeout(() => {
      explorerStore.setSelectedItems([]);
    }, 300);
    explorerStore.setOpenDeleteModal(false);
  };

  const handleClose = () => {
    setFolderName('');
    setTimeout(() => {
      explorerStore.setSelectedItems([]);
    }, 300);
    explorerStore.setOpenDeleteModal(false);
  };

  return {
    folderName,
    error,
    setError,
    setFolderName,
    handleConfirm,
    handleClose,
  };
}
