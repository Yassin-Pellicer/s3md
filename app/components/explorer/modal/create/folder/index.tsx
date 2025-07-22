import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { hooks } from "./hook";

const CreateFolderModal = ({
  open,
  onConfirm,
}: {
  open: boolean;
  onConfirm: (folderName: string) => void;
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
          p: 1,
        }}
      >
          <span className="material-symbols-outlined">folder</span>
          <span className="text-xl font-bold  tracking-tight">Create New Folder</span>
      </DialogTitle>

      <DialogContent sx={{ fontSize: "0.875rem", p: 1.5 }}>
        <p className="mb-1 mt-3">
          Please enter the name of the folder you want to create.
        </p>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          size="medium"
          fullWidth
          variant="outlined"
          value={folderHooks.folderName}
          onChange={(e) => folderHooks.setFolderName(e.target.value)}
        />

        {folderHooks.error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {folderHooks.error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 1.5, py: 2, paddingTop: 0 }}>
        <Button onClick={folderHooks.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={folderHooks.handleConfirm}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderModal;
