import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { Subject } from "@/app/types/Subject";
import { hooks } from "./hook";

const CreateCourseModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const courseHooks = hooks();

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
            value={courseHooks.formData.title}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                title: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={courseHooks.formData.description}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                description: e.target.value,
              }))
            }
            fullWidth
          />
          <TextField
            label="Starts At"
            type="date"
            value={courseHooks.formData.startsAt ? courseHooks.formData.startsAt.toISOString().slice(0, 10) : ""}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                startsAt: new Date(e.target.value),
              }))
            }
            fullWidth
          />
          <TextField
            label="Ends At"
            type="date"
            value={courseHooks.formData.endsAt ? courseHooks.formData.endsAt.toISOString().slice(0, 10) : ""}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                endsAt: new Date(e.target.value),
              }))
            }
            fullWidth
          />
          <TextField
            label="Inscription Start"
            type="date"
            value={courseHooks.formData.inscriptionStart ? courseHooks.formData.inscriptionStart.toISOString().slice(0, 10) : ""}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                inscriptionStart: new Date(e.target.value),
              }))
            }
            fullWidth
          />

<TextField
  select
  label="Select Subjects"
  SelectProps={{ multiple: true }}
  value={courseHooks.formData.subjects.map(s => s.id)} // store selected IDs for the UI
  onChange={(e) => {
    const value = e.target.value;

    if (value.includes("all")) {
      // Toggle select all / deselect all
      if (courseHooks.formData.subjects.length === courseHooks.subjectList.length) {
        courseHooks.setFormData(prev => ({
          ...prev,
          subjects: []
        }));
      } else {
        courseHooks.setFormData(prev => ({
          ...prev,
          subjects: courseHooks.subjectList // all subjects selected
        }));
      }
    } else {
      // Map selected IDs to full Subject objects
      courseHooks.setFormData(prev => ({
        ...prev,
        subjects: courseHooks.subjectList.filter(s => value.includes(s.id))
      }));
    }
  }}
  fullWidth
>
  {/* Select All / Deselect All */}
  <MenuItem value="all">
    <Checkbox
      checked={courseHooks.formData.subjects.length === courseHooks.subjectList.length}
      indeterminate={
        courseHooks.formData.subjects.length > 0 &&
        courseHooks.formData.subjects.length < courseHooks.subjectList.length
      }
    />
    <ListItemText
      primary={
        courseHooks.formData.subjects.length === courseHooks.subjectList.length
          ? "Deselect All"
          : "Select All"
      }
    />
  </MenuItem>

  {/* Individual subjects */}
  {courseHooks.subjectList.map((subject) => (
    <MenuItem key={subject.id} value={subject.id}>
      <Checkbox checked={courseHooks.formData.subjects.some(s => s.id === subject.id)} />
      <ListItemText primary={subject.title} />
    </MenuItem>
  ))}
</TextField>

          <TextField
            label="Inscription End"
            type="date"
            value={courseHooks.formData.inscriptionEnd  ? courseHooks.formData.inscriptionEnd.toISOString().slice(0, 10) : ""}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                inscriptionEnd: new Date(e.target.value),
              }))
            }
            fullWidth
          />
          <TextField
            label="Price"
            type="number"
            value={courseHooks.formData.price}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                price: parseFloat(e.target.value),
              }))
            }
            fullWidth
          />
          <TextField
            label="Duration"
            type="number"
            value={courseHooks.formData.duration}
            onChange={(e) =>
              courseHooks.setFormData(prev => ({
                ...prev,
                duration: parseInt(e.target.value, 10),
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
            courseHooks.uploadContent();
            setOpen(false);
          }}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseModal;