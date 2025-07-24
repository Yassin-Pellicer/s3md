import { useExplorerStore } from "@/app/contexts/explorer.store";
import { use, useEffect, useState } from "react";

export function hooks(onConfirm: (postName: string, postDescription: string) => void) {
  const [postName, setPostName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [error, setError] = useState("");
  const explorerStore = useExplorerStore();

  const handleConfirm = () => {
    const trimmed = postName.trim();
    if (trimmed === "" || trimmed.includes("/")) {
      setError("Post name cannot be empty or contain '/'");
      return;
    }
    if (trimmed) {
      onConfirm(postName, postDescription);
      setPostName("");
      setPostDescription("");
      explorerStore.setOpenCreatePostModal(false);
    }
  };

  const handleClose = () => {
    setPostName("");
    setPostDescription("");
    explorerStore.setOpenCreatePostModal(false);
  };

  useEffect(() => {
    setError("");
  }, [postName]);

  return {
    postName,
    error,
    postDescription,
    setPostDescription,
    setError,
    setPostName,
    handleConfirm,
    handleClose,
  };
}
