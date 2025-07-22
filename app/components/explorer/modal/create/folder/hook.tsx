import { useExplorerStore } from "@/app/contexts/explorer.store";
import { use, useEffect, useState } from "react";

export function hooks(onConfirm: (folderName: string) => void) {
  const [folderName, setFolderName] = useState("");
  const [error, setError] = useState("");
  const explorerStore = useExplorerStore();

  const handleConfirm = () => {
    const trimmed = folderName.trim();
    if (trimmed === "" || trimmed.includes("/")) {
      setError("Folder name cannot be empty or contain '/'");
      return;
    }
    if (trimmed) {
      onConfirm(folderName);
      setFolderName("");
      explorerStore.setOpenCreateFolderModal(false);
    }
  };

  const handleClose = () => {
    setFolderName("");
    explorerStore.setOpenCreateFolderModal(false);
  };

  useEffect(() => {
    setError("");
  }, [folderName]);

  return {
    folderName,
    error,
    setError,
    setFolderName,
    handleConfirm,
    handleClose,
  };
}
