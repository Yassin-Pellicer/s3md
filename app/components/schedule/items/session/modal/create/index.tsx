import React, { useEffect, FormEvent, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  MenuItem,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  FormLabel,
  FormGroup,
  Checkbox,
  Alert,
} from "@mui/material";

import { useSessionForm } from "./hook";
import { Subject } from "@/app/types/Subject";
import { Group } from "@/app/types/Group";
import { useCourseStore } from "@/app/contexts/course.store";

const CreateSessionModal = ({
  open,
  setOpen,
  onSuccess,
  group,
  initialDateTime,
  editingSession,
  session,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  group?: Group | null;
  initialDateTime?: Date | null;
  editingSession?: any;
  session?: any;
}) => {
  const hooks = useSessionForm({ group, initialDateTime, editingSession, session });
  const courseStore = useCourseStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", hooks.formData.session);

    try {
      await hooks.handleSubmit();
      console.log("Session creation successful");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Session creation failed:", error);
      // Error is already handled in the hook
    }
  };

  // Debug form data changes
  useEffect(() => {
    console.log("Form data updated:", hooks.formData);
  }, [hooks.formData]);

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      fullWidth
      aria-labelledby="create-session-dialog-title"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: {
          borderRadius: 2,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        id="create-session-dialog-title"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Create Session
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {hooks.errors?.submit && (
          <Alert severity="error">{hooks.errors.submit}</Alert>
        )}

        <TextField
          size="small"
          label="Description"
          fullWidth
          required
          value={hooks.formData.session?.description || ""}
          onChange={(e) =>
            hooks.setFormData((prev) => ({
              ...prev,
              session: {
                ...prev.session,
                description: e.target.value,
              },
            }))
          }
          error={!!hooks.errors?.description}
          helperText={hooks.errors?.description}
        />
        <TextField
          size="small"
          label="Duration (minutes)"
          type="number"
          fullWidth
          required
          value={hooks.formData.session?.duration || 60}
          onChange={(e) =>
            hooks.setFormData((prev) => ({
              ...prev,
              session: {
                ...prev.session,
                duration: parseInt(e.target.value) || 0,
              },
            }))
          }
        />
        <TextField
          size="small"
          label="Date"
          type="datetime-local"
          fullWidth
          required
          value={
            hooks.formData.session?.date
              ? (() => {
                const date = new Date(hooks.formData.session.date);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");
                return `${year}-${month}-${day}T${hours}:${minutes}`;
              })()
              : ""
          }
          onChange={(e) =>
            hooks.setFormData((prev) => ({
              ...prev,
              session: {
                ...prev.session,
                date: new Date(e.target.value),
              },
            }))
          }
          InputLabelProps={{ shrink: true }}
          error={!!hooks.errors?.date}
          helperText={hooks.errors?.date}
        />
        {!group && <TextField
          size="small"
          label="Group"
          select
          fullWidth
          required
          value={hooks.formData.session?.groupId || ""}
          onChange={(e) =>
            hooks.setFormData((prev) => ({
              ...prev,
              session: {
                ...prev.session,
                groupId: e.target.value,
              },
            }))
          }
          error={!!hooks.errors?.subjectId}
          helperText={hooks.errors?.subjectId}
        >
          {courseStore.selectedCourse?.groups?.map((group) => (
            <MenuItem key={group.id} value={group.id}>
              {group.title}
            </MenuItem>
          )) || []}
        </TextField>}
        <TextField
          size="small"
          label="Subject"
          select
          fullWidth
          required
          value={hooks.formData.session?.subjectId || ""}
          onChange={(e) =>
            hooks.setFormData((prev) => ({
              ...prev,
              session: {
                ...prev.session,
                subjectId: e.target.value,
              },
            }))
          }
          error={!!hooks.errors?.subjectId}
          helperText={hooks.errors?.subjectId}
        >
          {courseStore.selectedCourse?.subjects?.map((subject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.title}
            </MenuItem>
          )) || []}
        </TextField>

        <FormControlLabel
          control={
            <Switch
              checked={hooks.formData.series?.repeats || false}
              onChange={(e) => {
                console.log("Repeating switch changed:", e.target.checked);
                hooks.setFormData((prev) => ({
                  ...prev,
                  series: {
                    ...prev.series,
                    repeats: e.target.checked,
                  },
                }));
              }}
            />
          }
          label="Create multiple sessions"
        />

        {hooks.formData.series?.repeats && (
          <>
            <FormLabel error={!!hooks.errors?.repeatDays}>
              Days of the week {hooks.errors?.repeatDays && `- ${hooks.errors.repeatDays}`}
            </FormLabel>
            <FormGroup row>
              {hooks.daysOfWeek.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={hooks.formData.series?.days?.includes(day) || false}
                      onChange={() => {
                        console.log("Day toggled:", day);
                        hooks.handleDayToggle(day);
                      }}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>

            <TextField
              size="small"
              label="Repeat Until Date"
              type="date"
              fullWidth
              required
              value={
                hooks.formData.series?.endsAt
                  ? hooks.formData.series.endsAt.toISOString().split('T')[0]
                  : ""
              }
              onChange={(e) => {
                console.log("Repeat until date changed:", e.target.value);
                hooks.setFormData((prev) => ({
                  ...prev,
                  series: {
                    ...prev.series,
                    endsAt: e.target.value ? new Date(e.target.value) : null,
                  },
                }));
              }}
              InputLabelProps={{ shrink: true }}
              error={!!hooks.errors?.repeatUntilDate}
              helperText={hooks.errors?.repeatUntilDate}
            />
          </>
        )}

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
          >
            {session ? "Update Session" : "Create Session"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionModal;