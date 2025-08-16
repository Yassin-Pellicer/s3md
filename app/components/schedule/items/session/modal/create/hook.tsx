import { useEffect, useState, useCallback, useMemo } from "react";
import { 
  getSubjectsAction, 
  getGroupsAction, 
  uploadSessionAction 
} from "@/app/server/management.action";
import { Subject } from "@/app/types/Subject";
import { Group } from "@/app/types/Group";

interface SessionFormData {
  title: string;
  description: string;
  price: number;
  duration: number;
  date: Date | null;
  capacity: number;
  groupId: string;
  subjectId: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  price?: string;
  duration?: string;
  date?: string;
  capacity?: string;
  groupId?: string;
  subjectId?: string;
  submit?: string;
}

const initialFormData: SessionFormData = {
  title: "",
  description: "",
  price: 0,
  duration: 60,
  date: null,
  capacity: 1,
  groupId: "",
  subjectId: "",
};

export function useSessionForm() {
  const [formData, setFormData] = useState<SessionFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data on mount
  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setIsLoading(true);
    try {
      const [subjects, groups] = await Promise.all([
        getSubjectsAction(),
        getGroupsAction(),
      ]);
      setSubjectList(subjects);
      setGroupList(groups);
    } catch (error) {
      console.error("Failed to load initial data:", error);
      setErrors({ submit: "Failed to load subjects and groups" });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const updateFormField = useCallback(
    <K extends keyof SessionFormData>(field: K, value: SessionFormData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      
      // Clear field error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length > 100) {
      newErrors.title = "Title must be less than 100 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 500) {
      newErrors.description = "Description must be less than 500 characters";
    }

    if (!formData.date) {
      newErrors.date = "Session date and time is required";
    } else if (formData.date < new Date()) {
      newErrors.date = "Session date must be in the future";
    }

    if (!formData.subjectId) {
      newErrors.subjectId = "Subject is required";
    }

    if (!formData.groupId) {
      newErrors.groupId = "Group is required";
    }

    // Numeric validations
    if (formData.price < 0) {
      newErrors.price = "Price cannot be negative";
    } else if (formData.price > 10000) {
      newErrors.price = "Price seems unusually high";
    }

    if (formData.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    } else if (formData.duration > 480) {
      newErrors.duration = "Duration cannot exceed 8 hours (480 minutes)";
    }

    if (formData.capacity <= 0) {
      newErrors.capacity = "Capacity must be at least 1";
    } else if (formData.capacity > 100) {
      newErrors.capacity = "Capacity cannot exceed 100 students";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const submitForm = useCallback(async (): Promise<void> => {
    if (!validateForm()) {
      throw new Error("Please fix the form errors before submitting");
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await uploadSessionAction(formData);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to create session. Please try again.";
      
      setErrors({ submit: errorMessage });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  // Computed values
  const selectedSubject = useMemo(() => 
    subjectList.find(s => s.id === formData.subjectId),
    [subjectList, formData.subjectId]
  );

  const selectedGroup = useMemo(() => 
    groupList.find(g => g.id === formData.groupId),
    [groupList, formData.groupId]
  );

  const minDateTime = useMemo(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  }, []);

  const durationDisplay = useMemo(() => 
    `${Math.floor(formData.duration / 60)}h ${formData.duration % 60}m`,
    [formData.duration]
  );

  const characterCounts = useMemo(() => ({
    title: `${formData.title.length}/100 characters`,
    description: `${formData.description.length}/500 characters`,
  }), [formData.title.length, formData.description.length]);

  const isFormReady = useMemo(() => 
    !isLoading && subjectList.length > 0 && groupList.length > 0,
    [isLoading, subjectList.length, groupList.length]
  );

  return {
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
    validateForm,
  };
}

// Optional: Separate hook for managing modal state
export function useSessionModal() {
  const [isOpen, setIsOpen] = useState(false);
  const sessionForm = useSessionForm();

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    if (!sessionForm.isSubmitting) {
      setIsOpen(false);
      sessionForm.resetForm();
    }
  }, [sessionForm.isSubmitting, sessionForm.resetForm]);

  const handleSubmit = useCallback(async () => {
    try {
      await sessionForm.submitForm();
      closeModal();
      // You can add success callback here if needed
    } catch (error) {
      // Error is already handled in the form hook
      console.error("Session creation failed:", error);
    }
  }, [sessionForm.submitForm, closeModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    handleSubmit,
    ...sessionForm,
  };
}