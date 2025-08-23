import React, { useEffect, FormEvent, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
  IconButton,
  Typography,
  Box,
  InputAdornment,
  Alert,
  CircularProgress,
  Skeleton,
  FormControlLabel,
  Switch,
  Chip,
  Card,
  CardContent,
  Collapse,
  FormLabel,
  FormGroup,
  Checkbox,
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
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
  group?: Group | null;
  initialDateTime?: Date | null;
  editingSession?: any;
}) => {
  const hooks = useSessionForm({ group, initialDateTime, editingSession });
  const courseStore = useCourseStore();
    const [multiple, setMultiple] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      maxWidth="md"
      fullWidth
      aria-labelledby="create-session-dialog-title"
      PaperProps={{
        component: "form",
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
        <TextField
          size="small"
          label="Description"
          fullWidth
        />
        <TextField
          size="small"
          label="Duration (minutes)"
          type="number"
          fullWidth
        />
        <TextField
          size="small"
          label="Date"
          type="datetime-local"
          fullWidth
          value={
            hooks.formData.date
              ? (() => {
                const utcDate = new Date(hooks.formData.date);
                const year = utcDate.getFullYear();
                const month = String(utcDate.getMonth() + 1).padStart(2, "0");
                const day = String(utcDate.getDate()).padStart(2, "0");
                const hours = String(utcDate.getHours()).padStart(2, "0");
                const minutes = String(utcDate.getMinutes()).padStart(2, "0");
                return `${year}-${month}-${day}T${hours}:${minutes}`;
              })()
              : ""
          }
          onChange={(e) =>
            hooks.setFormData((prev) => ({
              ...prev,
              date: new Date(e.target.value),
            }))
          }
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          size="small"
          label="Subject"
          select
          fullWidth
          value={hooks.formData.subjectId || ""}
          onChange={(e) =>
            hooks.setFormData((prev) => ({
              ...prev,
              subjectId: e.target.value,
            }))
          }
        >
          {courseStore.selectedCourse?.subjects!.map((subject) => (
            <MenuItem key={subject.id} value={subject.id}>
              {subject.title}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
       <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={multiple}
              onChange={() => setMultiple((prev) => !prev)}
            />
          }
          label="Create multiple sessions"
        />

        {multiple && 
          <>
            <FormLabel>Days of the week</FormLabel>
            <FormGroup row>
              {daysOfWeek.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={selectedDays.includes(day)}
                      onChange={() => handleDayToggle(day)}
                    />
                  }
                  label={day}
                />
              ))}
            </FormGroup>

            <Box display="flex" gap={2}>
              <TextField
                size="small"
                label="Start Date"
                type="date"
                fullWidth
                onChange={(e) =>
                  hooks.setFormData((prev) => ({
                    ...prev,
                    startDate: e.target.value
                  }))
                }
                InputLabelProps={{ shrink: true }}
              />

              <TextField
                size="small"
                label="End Date"
                type="date"
                fullWidth
                onChange={(e) =>
                  hooks.setFormData((prev) => ({
                    ...prev,
                    endDate: e.target.value
                  }))
                }
                InputLabelProps={{ shrink: true }}
              />
            </Box>
          </>}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={() => setOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateSessionModal;