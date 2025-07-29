import React from "react";
import { Button, Dialog, DialogActions } from "@mui/material";
import { hooks } from "./hook";
import { Folder } from "@/app/types/Folder";
import { Post } from "@/app/types/Post";
import Scout from "@/app/components/scout";

const MoveItemsModal = ({
  open,
  items,
  onConfirm,
}: {
  open: boolean;
  items?: { item: Folder | Post | null; type: "folder" | "post" | null }[];
  onConfirm: () => void;
}) => {
  const folderHooks = hooks(onConfirm);

  return (
    <Dialog
      open={open}
      onClose={folderHooks.handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            maxWidth: "1000px",
            px: 4,
            py: 1.5,
            overflow: "hidden",
          },
        },
      }}
      fullWidth
      maxWidth="xl"
    >
      <Scout mode={"guest"} />
      <DialogActions sx={{ mb: 1 }}>
        <Button onClick={folderHooks.handleClose}>Close</Button>
        <Button variant="contained" onClick={folderHooks.handleConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveItemsModal;
