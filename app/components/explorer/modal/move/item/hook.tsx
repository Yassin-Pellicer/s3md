import { useExplorerStore } from '@/app/contexts/explorer.store';

export const executeOnConfirm = (onConfirm: () => void) => (id?: string) => onConfirm();

export function hooks (onConfirm: () => void) {
  const explorerStore = useExplorerStore();

  const handleConfirm = () => {
    onConfirm();
    explorerStore.setOpenMoveModal(false);
  };

  const handleClose = () => {
    explorerStore.setOpenMoveModal(false);
  };

  return {
    handleConfirm,
    handleClose,
  };
}
