import { useEditorStore } from "@/app/contexts/editor.store";
import { useExplorerStore } from "@/app/contexts/explorer.store";
import { useScoutStore } from "@/app/contexts/scout.store";
import { use } from "react";

export function hooks (onConfirm: () => void) {
  const editorStore = useEditorStore();
  const scoutStore = useScoutStore();

  const handleConfirm = () => {
    onConfirm();
    useExplorerStore.getState().setRoute(scoutStore.route);
    editorStore.setRouteChangeModalOpen(false);
  };

  const handleClose = () => {
    editorStore.setRouteChangeModalOpen(false);
  };

  return {
    handleConfirm,
    handleClose,
  };
}
