import React from "react";
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
} from "@mui/material";
import {
  Close as CloseIcon,
  School as SchoolIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import { useSessionForm } from "./hook";
import { Subject } from "@/app/types/Subject";
import { Group } from "@/app/types/Group";

interface CreateSessionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSuccess?: () => void;
}

const CreateSessionModal: React.FC<CreateSessionModalProps> = ({
  open,
  setOpen,
  onSuccess,
}) => {
  const {
    // Form data
    formData,
    errors,
    isSubmitting,
    isLoading,
    
    // Lists
    subjectList,
    groupList,
    
    // Computed values
    selectedSubject,
    selectedGroup,
    minDateTime,
    durationDisplay,
    characterCounts,
    isFormReady,
    
    // Actions
    updateFormField,
    submitForm,
    resetForm,
  } = useSessionForm();

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    try {
      await submitForm();
      onSuccess?.();
      setOpen(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setOpen(false);
    }
  };

  if (isLoading) {
    return (
      <Dialog open={open} maxWidth="md" fullWidth>
        <DialogContent>
          <Stack spacing={2} sx={{ p: 2 }}>
            <Skeleton variant="text" height={40} />
            <Skeleton variant="rectangular" height={120} />
            <Skeleton variant="text" height={40} />
          </Stack>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="create-session-dialog-title"
      PaperProps={{
        component: 'form',
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
          gap: 1.5,
          pb: 2,
        }}
      >
        <SchoolIcon color="primary" />
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          Create New Tutoring Session
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

      <DialogContent dividers>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Create a new tutoring session. Fill in all required fields marked with *.
        </Typography>

        {errors.submit && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {errors.submit}
          </Alert>
        )}

        {!isFormReady && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            No subjects or groups available. Please add them first.
          </Alert>
        )}

        <Stack spacing={3}>
          {/* Basic Information */}
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Session Details
            </Typography>
            
            <Stack spacing={2.5}>
              <TextField
                label="Session Title"
                name="title"
                value={formData.title}
                onChange={(e) => updateFormField('title', e.target.value)}
                error={!!errors.title}
                helperText={errors.title || characterCounts.title}
                required
                fullWidth
                autoFocus
                inputProps={{ maxLength: 100 }}
              />

              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) => updateFormField('description', e.target.value)}
                error={!!errors.description}
                helperText={errors.description || characterCounts.description}
                required
                fullWidth
                multiline
                rows={3}
                inputProps={{ maxLength: 500 }}
              />

              <TextField
                label="Session Date & Time"
                type="datetime-local"
                value={formData.date ? formData.date.toISOString().slice(0, 16) : ""}
                onChange={(e) => {
                  updateFormField('date', e.target.value ? new Date(e.target.value) : null);
                }}
                error={!!errors.date}
                helperText={errors.date}
                required
                fullWidth
                InputLabelProps={{ shrink: true }}
                inputProps={{ min: minDateTime }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
          </Box>

          {/* Academic Information */}
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Academic Details
            </Typography>
            
            <Stack spacing={2.5}>
              <TextField
                select
                label="Subject"
                value={formData.subjectId}
                onChange={(e) => updateFormField('subjectId', e.target.value)}
                error={!!errors.subjectId}
                helperText={errors.subjectId || (selectedSubject && `Selected: ${selectedSubject.title}`)}
                required
                fullWidth
                disabled={subjectList.length === 0}
              >
                <MenuItem value="">
                  <em>Select a subject</em>
                </MenuItem>
                {subjectList.map((subject: Subject) => (
                  <MenuItem key={subject.id} value={subject.id}>
                    {subject.title}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                label="Group"
                value={formData.groupId}
                onChange={(e) => updateFormField('groupId', e.target.value)}
                error={!!errors.groupId}
                helperText={errors.groupId || (selectedGroup && `Selected: ${selectedGroup.title}`)}
                required
                fullWidth
                disabled={groupList.length === 0}
              >
                <MenuItem value="">
                  <em>Select a group</em>
                </MenuItem>
                {groupList.map((group: Group) => (
                  <MenuItem key={group.id} value={group.id}>
                    {group.title}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
          </Box>

          {/* Session Configuration */}
          <Box>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Session Configuration
            </Typography>
            
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Price per Student"
                type="number"
                value={formData.price}
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  updateFormField('price', isNaN(value) ? 0 : Math.max(0, value));
                }}
                error={!!errors.price}
                helperText={errors.price}
                fullWidth
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  inputProps: { min: 0, step: 0.01, max: 10000 }
                }}
              />

              <TextField
                label="Duration (minutes)"
                type="number"
                value={formData.duration}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  updateFormField('duration', isNaN(value) ? 60 : Math.max(1, value));
                }}
                error={!!errors.duration}
                helperText={errors.duration || durationDisplay}
                fullWidth
                InputProps={{
                  inputProps: { min: 1, max: 480, step: 15 }
                }}
              />

              <TextField
                label="Student Capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  updateFormField('capacity', isNaN(value) ? 1 : Math.max(1, value));
                }}
                error={!!errors.capacity}
                helperText={errors.capacity}
                fullWidth
                InputProps={{
                  inputProps: { min: 1, max: 100 }
                }}
              />
            </Stack>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
        <Button 
          onClick={handleClose} 
          disabled={isSubmitting}
          color="inherit"
          size="large"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting || !isFormReady}
          size="large"
          startIcon={isSubmitting ? <CircularProgress size={18} /> : null}
        >
          {isSubmitting ? "Creating Session..." : "Create Session"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateSessionModal;