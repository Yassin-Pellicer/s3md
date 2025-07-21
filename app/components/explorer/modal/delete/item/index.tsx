import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button
} from '@mui/material';
import { hooks } from './hook';
import { Folder } from '@/app/types/Folder';
import { Post } from '@/app/types/Post';

const DeleteFolderModal = ({ open, item, type, onConfirm }: { open: boolean, item?: Folder | Post | null, type: "folder" | "post" | null, onConfirm: () => void }) => {
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
      <DialogTitle sx={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
        <span className="material-symbols-outlined">delete</span>
        Delete Item.
      </DialogTitle>

      <DialogContent sx={{ fontSize: '0.875rem', p: 1.5 }}>
        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
          Are you sure you want to delete the {type === 'folder' ? 'folder' : 'post'} {type === 'folder' ? (item as Folder)?.name : (item as Post)?.title}? This will remove all contents and their stored items? This action is irreversible.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 2, pb: 1.5 }}>
        <Button size="small" onClick={folderHooks.handleClose}>Cancel</Button>
        <Button
          size="small"
          variant="contained"
          onClick={folderHooks.handleConfirm}
          color="error"
          startIcon={<span className="material-symbols-outlined">delete_forever</span>}
        >
          Remove
        </Button>
      </DialogActions>
    </Dialog>

  );
};

export default DeleteFolderModal;

