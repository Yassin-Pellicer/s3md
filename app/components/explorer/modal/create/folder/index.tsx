import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { hooks } from './hook';

const CreateFolderModal = ({ open, onConfirm }: { open: boolean, onConfirm: (folderName: string) => void }) => {
  const folderHooks = hooks(onConfirm);

  return (
    <Dialog open={open} onClose={folderHooks.handleClose}>
      <DialogTitle>Create New Folder</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Folder Name"
          fullWidth
          variant="outlined"
          value={folderHooks.folderName}
          onChange={(e) => folderHooks.setFolderName(e.target.value)}
        />
        {folderHooks.error && (
          <Typography color="error" variant="body2">
            {folderHooks.error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={folderHooks.handleClose}>Cancel</Button>
        <Button variant="contained" onClick={folderHooks.handleConfirm}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateFolderModal;

