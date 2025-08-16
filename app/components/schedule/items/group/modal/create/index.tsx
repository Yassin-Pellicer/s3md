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
import { Subject } from "@/app/types/Subject";
import { hooks } from "./hook";

const CreateSubjectModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const subjectHooks = hooks();

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
        <span className="material-symbols-outlined">folder</span>
        <span className="text-xl font-bold tracking-tight">
          Create New Subject
        </span>
      </DialogTitle>
      <DialogContent sx={{ fontSize: "0.875rem", p: 1.5 }}>
        <p className="mb-3 mt-1">
          Please fill in the subject details below.
        </p>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={subjectHooks.formData.title}
            onChange={(e) =>
              subjectHooks.setFormData(prev => ({
                ...prev,
                title: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={subjectHooks.formData.description}
            onChange={(e) =>
              subjectHooks.setFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            type="color"
            value={subjectHooks.formData.color}
            onChange={(e) =>
              subjectHooks.setFormData(prev => ({
                ...prev,
                color: e.target.value,
              }))
            }
          />
          <TextField
            label="Topic"
            name="topic"
            value={subjectHooks.formData.topic}
            onChange={(e) =>
              subjectHooks.setFormData(prev => ({
                ...prev,
                topic: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Material Route"
            name="materialRoute"
            value={subjectHooks.formData.materialRoute}
            onChange={(e) =>
              subjectHooks.setFormData(prev => ({
                ...prev,
                materialRoute: e.target.value,
              }))
            }
            fullWidth
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
            subjectHooks.uploadContent();
            setOpen(false);
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSubjectModal;