import React, { useState, useCallback, useMemo } from "react";
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
  FormHelperText,
  IconButton,
  Typography,
  Box,
  Chip,
  InputAdornment,
} from "@mui/material";
import { Close as CloseIcon, School as SchoolIcon } from "@mui/icons-material";
import { Subject } from "@/app/types/Subject";
import { hooks } from "./hook";

interface CreateCourseModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  open,
  setOpen,
}) => {
  const courseHooks = hooks();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation rules
  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!courseHooks.formData.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!courseHooks.formData.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!courseHooks.formData.startsAt) {
      newErrors.startsAt = "Start date is required";
    }

    if (!courseHooks.formData.endsAt) {
      newErrors.endsAt = "End date is required";
    }

    if (courseHooks.formData.startsAt && courseHooks.formData.endsAt) {
      if (courseHooks.formData.startsAt >= courseHooks.formData.endsAt) {
        newErrors.endsAt = "End date must be after start date";
      }
    }

    if (courseHooks.formData.inscriptionStart && courseHooks.formData.inscriptionEnd) {
      if (courseHooks.formData.inscriptionStart >= courseHooks.formData.inscriptionEnd) {
        newErrors.inscriptionEnd = "Inscription end date must be after start date";
      }
    }

    if (courseHooks.formData.inscriptionStart && courseHooks.formData.startsAt) {
      if (courseHooks.formData.inscriptionStart >= courseHooks.formData.startsAt) {
        newErrors.inscriptionStart = "Inscription must start before course starts";
      }
    }

    if (courseHooks.formData.price! < 0) {
      newErrors.price = "Price cannot be negative";
    }

    if (courseHooks.formData.duration! <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    }

    if (courseHooks.formData.subjects.length! === 0) {
      newErrors.subjects = "At least one subject must be selected";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [courseHooks.formData]);

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await courseHooks.uploadContent();
      setOpen(false);
      // Reset form after successful submission
      courseHooks.resetForm?.();
    } catch (error) {
      console.error("Failed to create course:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
      setErrors({});
    }
  };

  // Get today's date for min date validation
  const today = new Date().toISOString().split("T")[0];

  // Memoized selected subjects display
  const selectedSubjectsDisplay = useMemo(() => {
    if (courseHooks.formData.subjects.length === 0) {
      return "No subjects selected";
    }
    if (courseHooks.formData.subjects.length === 1) {
      return courseHooks.formData.subjects[0].title;
    }
    return `${courseHooks.formData.subjects.length} subjects selected`;
  }, [courseHooks.formData.subjects]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="create-course-dialog-title"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 3,
            p: 1.5,
            maxHeight: "90vh",
          },
        },
      }}
    >
      <DialogTitle
        id="create-course-dialog-title"
        sx={{
          fontSize: "1.25rem",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: 2,
          pr: 1,
        }}
      >
        <SchoolIcon color="primary" />
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Create New Course
        </Typography>
        <IconButton
          aria-label="close dialog"
          onClick={handleClose}
          disabled={isSubmitting}
          size="small"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2, pt: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Fill in the course details below. All fields marked with * are required.
        </Typography>

        <Stack spacing={2.5}>
          <TextField
            label="Course Title *"
            name="title"
            value={courseHooks.formData.title || ""}
            onChange={(e) => {
              courseHooks.setFormData(prev => ({
                ...prev,
                title: e.target.value,
              }));
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: "" }));
              }
            }}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
            autoFocus
          />

          <TextField
            label="Description *"
            name="description"
            value={courseHooks.formData.description || ""}
            onChange={(e) => {
              courseHooks.setFormData(prev => ({
                ...prev,
                description: e.target.value,
              }));
              if (errors.description) {
                setErrors(prev => ({ ...prev, description: "" }));
              }
            }}
            error={!!errors.description}
            helperText={errors.description}
            fullWidth
            multiline
            rows={3}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Start Date *"
              type="date"
              value={courseHooks.formData.startsAt ? courseHooks.formData.startsAt.toISOString().slice(0, 10) : ""}
              onChange={(e) => {
                courseHooks.setFormData(prev => ({
                  ...prev,
                  startsAt: e.target.value ? new Date(e.target.value) : null,
                }));
                if (errors.startsAt) {
                  setErrors(prev => ({ ...prev, startsAt: "" }));
                }
              }}
              error={!!errors.startsAt}
              helperText={errors.startsAt}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              fullWidth
            />

            <TextField
              label="End Date *"
              type="date"
              value={courseHooks.formData.endsAt ? courseHooks.formData.endsAt.toISOString().slice(0, 10) : ""}
              onChange={(e) => {
                courseHooks.setFormData(prev => ({
                  ...prev,
                  endsAt: e.target.value ? new Date(e.target.value) : null,
                }));
                if (errors.endsAt) {
                  setErrors(prev => ({ ...prev, endsAt: "" }));
                }
              }}
              error={!!errors.endsAt}
              helperText={errors.endsAt}
              InputLabelProps={{ shrink: true }}
              inputProps={{ 
                min: courseHooks.formData.startsAt ? courseHooks.formData.startsAt.toISOString().slice(0, 10) : today 
              }}
              fullWidth
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Inscription Start"
              type="date"
              value={courseHooks.formData.inscriptionStart ? courseHooks.formData.inscriptionStart.toISOString().slice(0, 10) : ""}
              onChange={(e) => {
                courseHooks.setFormData(prev => ({
                  ...prev,
                  inscriptionStart: e.target.value ? new Date(e.target.value) : null,
                }));
                if (errors.inscriptionStart) {
                  setErrors(prev => ({ ...prev, inscriptionStart: "" }));
                }
              }}
              error={!!errors.inscriptionStart}
              helperText={errors.inscriptionStart}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }}
              fullWidth
            />

            <TextField
              label="Inscription End"
              type="date"
              value={courseHooks.formData.inscriptionEnd ? courseHooks.formData.inscriptionEnd.toISOString().slice(0, 10) : ""}
              onChange={(e) => {
                courseHooks.setFormData(prev => ({
                  ...prev,
                  inscriptionEnd: e.target.value ? new Date(e.target.value) : null,
                }));
                if (errors.inscriptionEnd) {
                  setErrors(prev => ({ ...prev, inscriptionEnd: "" }));
                }
              }}
              error={!!errors.inscriptionEnd}
              helperText={errors.inscriptionEnd}
              InputLabelProps={{ shrink: true }}
              inputProps={{ 
                min: courseHooks.formData.inscriptionStart ? courseHooks.formData.inscriptionStart.toISOString().slice(0, 10) : today 
              }}
              fullWidth
            />
          </Box>

          <TextField
            select
            label="Select Subjects *"
            SelectProps={{ 
              multiple: true,
              renderValue: () => selectedSubjectsDisplay,
            }}
            value={courseHooks.formData.subjects.map(s => s.id)}
            onChange={(e) => {
              const value = typeof e.target.value === "string" ? e.target.value.split(",") : e.target.value;

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
                    subjects: courseHooks.subjectList
                  }));
                }
              } else {
                // Map selected IDs to full Subject objects
                const selectedSubjects = courseHooks.subjectList.filter(s => value.includes(s.id));
                courseHooks.setFormData(prev => ({
                  ...prev,
                  subjects: selectedSubjects
                }));
              }

              if (errors.subjects) {
                setErrors(prev => ({ ...prev, subjects: "" }));
              }
            }}
            error={!!errors.subjects}
            helperText={errors.subjects}
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

          {/* Show selected subjects as chips */}
          {courseHooks.formData.subjects.length > 0 && (
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
                Selected Subjects:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {courseHooks.formData.subjects.map((subject) => (
                  <Chip
                    key={subject.id}
                    label={subject.title}
                    size="small"
                    onDelete={() => {
                      courseHooks.setFormData(prev => ({
                        ...prev,
                        subjects: prev.subjects.filter(s => s.id !== subject.id)
                      }));
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              label="Price"
              type="number"
              value={courseHooks.formData.price || ""}
              onChange={(e) => {
                const value = parseFloat(e.target.value);
                courseHooks.setFormData(prev => ({
                  ...prev,
                  price: isNaN(value) ? 0 : value,
                }));
                if (errors.price) {
                  setErrors(prev => ({ ...prev, price: "" }));
                }
              }}
              error={!!errors.price}
              helperText={errors.price}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                inputProps: { min: 0, step: 0.01 }
              }}
              fullWidth
            />

            <TextField
              label="Duration (hours)"
              type="number"
              value={courseHooks.formData.duration || ""}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                courseHooks.setFormData(prev => ({
                  ...prev,
                  duration: isNaN(value) ? 0 : value,
                }));
                if (errors.duration) {
                  setErrors(prev => ({ ...prev, duration: "" }));
                }
              }}
              error={!!errors.duration}
              helperText={errors.duration}
              InputProps={{
                inputProps: { min: 1 }
              }}
              fullWidth
            />
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 2, py: 2, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          disabled={isSubmitting}
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Course"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateCourseModal;