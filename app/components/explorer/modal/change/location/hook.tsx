import { useExplorerStore } from '@/app/contexts/explorer.store';
import { useScoutStore } from '@/app/contexts/scout.store';

export function hooks (onConfirm: () => void) {
  const explorerStore = useExplorerStore();
  const scoutStore = useScoutStore();

  const handleConfirm = () => {
    onConfirm();
    explorerStore.setOpenMoveModal(false);
    explorerStore.setSelectedItems([]);
    explorerStore.setEditorMode(false);
  };

  const handleClose = () => {
    explorerStore.setOpenMoveModal(false);
    if(!explorerStore.editorMode) explorerStore.setSelectedItems([]);
  };

  return {
    handleConfirm,
    handleClose,
  };
}
