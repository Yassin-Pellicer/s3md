import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';
import { hooks } from './hook';

const DeleteFolderModal = ({ open, onConfirm }: { open: boolean, onConfirm: (folderName: string) => void }) => {
  const folderHooks = hooks(onConfirm);

  return (
    <Dialog open={open} onClose={folderHooks.handleClose}>
      <DialogTitle>Delete Folder</DialogTitle>
      <DialogContent>
        <DialogContent>
          <p>Are you sure you want to delete the selected contents and their stored items? This action is irrevesible.</p>
        </DialogContent>
        {folderHooks.error && (
          <Typography color="error" variant="body2">
            {folderHooks.error}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={folderHooks.handleClose}>Cancel</Button>
        <Button variant="contained" onClick={folderHooks.handleConfirm}>Remove</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFolderModal;

