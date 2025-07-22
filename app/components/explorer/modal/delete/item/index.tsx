import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import { hooks } from "./hook";
import { Folder } from "@/app/types/Folder";
import { Post } from "@/app/types/Post";

const DeleteFolderModal = ({
  open,
  items,
  onConfirm,
}: {
  open: boolean;
  items: { item: Folder | Post | null; type: "folder" | "post" | null }[];
  onConfirm: () => void;
}) => {
  const folderHooks = hooks(onConfirm);

  const singleItem =
    items.length === 1 && items[0].type === "post"
      ? (items[0].item as Post)
      : items.length === 1 && items[0].type === "folder"
      ? (items[0].item as Folder)
      : null;

  return (
    <Dialog
      open={open}
      onClose={folderHooks.handleClose}
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1.5,
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontSize: "1rem",
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 1,
        }}
      >
        <span className="material-symbols-outlined">delete</span>
        <span className="text-xl font-bold tracking-tight">Delete Item</span>
      </DialogTitle>

      <DialogContent sx={{ fontSize: "0.875rem", p: 1.5 }}>
        {singleItem ? (
          <p>
            Are you sure you want to delete the{" "}
            {singleItem && items[0].type === "folder" ? "folder" : "post"}{" "}
            <span className="italic">
              {(items[0].type === "folder"
                ? (singleItem as Folder)?.name
                : (singleItem as Post)?.title) ?? ""}
            </span>
            ? This will remove all contents and their stored items.{" "}
            <b>This action is irreversible.</b>
          </p>
        ) : (
          <p>
            Are you sure you want to delete these {items.length} items? This will
            remove all their contents and stored data.{" "}
            <b>This action is irreversible.</b>
          </p>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 1.5 }}>
        <Button size="small" onClick={folderHooks.handleClose}>
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={folderHooks.handleConfirm}
          color="error"
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFolderModal;
