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
  onConfirm: (postName: string, postDescription: string) => void;
}) => {
  const postHooks = hooks(onConfirm);

  return (
    <Dialog
      open={open}
      onClose={postHooks.handleClose}
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
          <span className="material-symbols-outlined">post_add</span>
          <span className="text-xl font-bold  tracking-tight">Create New Post</span>
      </DialogTitle>

      <DialogContent sx={{ fontSize: "0.875rem", p: 1.5 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Title"
          size="small"
          fullWidth
          variant="outlined"
          value={postHooks.postName}
          onChange={(e) => postHooks.setPostName(e.target.value)}
        />

          <TextField
          autoFocus
          margin="dense"
          label="Description"
          size="small"
          fullWidth
          variant="outlined"
          value={postHooks.postDescription}
          onChange={(e) => postHooks.setPostDescription(e.target.value)}
        />

        {postHooks.error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {postHooks.error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 1.5, py: 2, paddingTop: 0 }}>
        <Button onClick={postHooks.handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={postHooks.handleConfirm}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderModal;
