import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { hooks } from "./hook";

const CreateGroupModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const groupHooks = hooks();
  
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
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
        <span className="material-symbols-outlined">groups</span>
        <span className="text-xl font-bold tracking-tight">
          Create New Group
        </span>
      </DialogTitle>
      <DialogContent sx={{ fontSize: "0.875rem", p: 1.5 }}>
        <p className="mb-3 mt-1">
          Please fill in the group details below.
        </p>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={groupHooks.formData.title}
            onChange={(e) =>
              groupHooks.setFormData(prev => ({
                ...prev,
                title: e.target.value,
              }))
            }
            fullWidth
            required
          />
          <TextField
            label="Description"
            name="description"
            value={groupHooks.formData.description}
            onChange={(e) =>
              groupHooks.setFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
            fullWidth
            multiline
            rows={3}
            required
          />
          <TextField
            label="Capacity"
            name="capacity"
            type="number"
            value={groupHooks.formData.capacity}
            onChange={(e) =>
              groupHooks.setFormData(prev => ({
                ...prev,
                capacity: parseInt(e.target.value) || 0,
              }))
            }
            fullWidth
            inputProps={{ min: 1 }}
            required
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 1.5, py: 2, paddingTop: 0 }}>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            groupHooks.uploadContent();
            setOpen(false);
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateGroupModal;