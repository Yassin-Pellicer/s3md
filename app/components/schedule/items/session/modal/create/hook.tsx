import { useEffect, useState, useCallback, useMemo } from "react";
import { 
  getSubjectsAction, 
  getGroupsAction, 
  uploadSessionAction, 
  getSubjectsFromCourse
} from "@/app/server/management.action";
import { Subject } from "@/app/types/Subject";
import { Group } from "@/app/types/Group";
import { useCourseStore } from "@/app/contexts/course.store";

interface SessionFormData {
  title: string;
  description: string;
  duration: number;
  date: Date | null;
  groupId: string;
  subjectId: string;
  // Repeat functionality
  isRepeating: boolean;
  repeatDays: number[]; // 0 = Sunday, 1 = Monday, etc.
  repeatUntilDate: Date | null;
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
  repeatDays?: string;
  repeatUntilDate?: string;
  submit?: string;
}

const initialFormData: SessionFormData = {
  title: "",
  description: "",
  duration: 60,
  date: null,
  groupId: "",
  subjectId: "",
  isRepeating: false,
  repeatDays: [],
  repeatUntilDate: null,
};

const DAYS_OF_WEEK = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' },
];

interface UseSessionFormProps {
  group?: Group | null;
  initialDateTime?: Date | null;
  editingSession?: any; // For editing existing sessions
}

export function useSessionForm({ group, initialDateTime, editingSession }: UseSessionFormProps) {
  const [formData, setFormData] = useState<SessionFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const courseStore = useCourseStore();

  // Initialize data on mount or when group changes
  useEffect(() => {
    initializeData();
    setFormData(prev => ({ 
      ...prev, 
      groupId: group?.id || "",
      date: initialDateTime || prev.date
    }));
  }, [group, courseStore.selectedCourse, initialDateTime]);

  // Load existing session data for editing
  useEffect(() => {
    if (editingSession) {
      setFormData(prev => ({
        ...prev,
        title: editingSession.title || "",
        description: editingSession.extendedProps?.description || "",
        price: editingSession.extendedProps?.price || 0,
        duration: editingSession.extendedProps?.duration || 60,
        date: editingSession.start ? new Date(editingSession.start) : null,
        capacity: editingSession.extendedProps?.capacity || 1,
        subjectId: editingSession.extendedProps?.subjectId || "",
        // For editing, we don't pre-populate repeat settings
        isRepeating: false,
        repeatDays: [],
        repeatUntilDate: null,
      }));
    }
  }, [editingSession]);

  const initializeData = async () => {
    setIsLoading(true);
    try {
      // Load subjects from selectedCourse
      const subjects = courseStore.selectedCourse?.subjects || [];
      setSubjectList(subjects);

      // If group is provided, set it automatically in form
      setFormData(prev => ({
        ...prev,
        groupId: group?.id || "",
        date: initialDateTime || prev.date
      }));
    } catch (error) {
      console.error("Failed to load initial data:", error);
      setErrors({ submit: "Failed to load subjects and groups" });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData({
      ...initialFormData,
      groupId: group?.id || "", // keep group auto-set
      date: initialDateTime || null, // keep initial date if provided
    });
    setErrors({});
    setIsSubmitting(false);
  }, [group, initialDateTime]);

  const updateFormField = useCallback(
    <K extends keyof SessionFormData>(field: K, value: SessionFormData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    },
    [errors]
  );

  const toggleRepeatDay = useCallback((dayValue: number) => {
    setFormData(prev => ({
      ...prev,
      repeatDays: prev.repeatDays.includes(dayValue)
        ? prev.repeatDays.filter(d => d !== dayValue)
        : [...prev.repeatDays, dayValue].sort()
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};

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

    if (formData.duration <= 0) {
      newErrors.duration = "Duration must be greater than 0";
    } else if (formData.duration > 480) {
      newErrors.duration = "Duration cannot exceed 8 hours (480 minutes)";
    }

    // Repeat validation
    if (formData.isRepeating) {
      if (formData.repeatDays.length === 0) {
        newErrors.repeatDays = "Select at least one day to repeat";
      }
      
      if (!formData.repeatUntilDate) {
        newErrors.repeatUntilDate = "End date is required for repeating sessions";
      } else if (formData.repeatUntilDate <= new Date()) {
        newErrors.repeatUntilDate = "End date must be in the future";
      } else if (formData.date && formData.repeatUntilDate <= formData.date) {
        newErrors.repeatUntilDate = "End date must be after the start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // Generate session dates based on repeat settings
  const generateSessionDates = useCallback((): Date[] => {
    if (!formData.date || !formData.isRepeating || !formData.repeatUntilDate) {
      return formData.date ? [formData.date] : [];
    }

    const dates: Date[] = [];
    const startDate = new Date(formData.date);
    const endDate = new Date(formData.repeatUntilDate);
    
    // Always include the initial date
    dates.push(new Date(startDate));
    
    // Generate recurring dates
    const currentDate = new Date(startDate);
    currentDate.setDate(currentDate.getDate() + 1); // Start from next day
    
    while (currentDate <= endDate) {
      const dayOfWeek = currentDate.getDay();
      if (formData.repeatDays.includes(dayOfWeek)) {
        const sessionDate = new Date(currentDate);
        sessionDate.setHours(startDate.getHours());
        sessionDate.setMinutes(startDate.getMinutes());
        sessionDate.setSeconds(0);
        sessionDate.setMilliseconds(0);
        dates.push(sessionDate);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return dates;
  }, [formData]);

  const submitForm = useCallback(async (): Promise<void> => {
    console.log("submitForm", formData);

    if (!validateForm()) {
      throw new Error("Please fix form errors");
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const sessionDates = generateSessionDates();
      
      if (sessionDates.length === 0) {
        throw new Error("No valid session dates generated");
      }

      // Create sessions for each date
      const sessionPromises = sessionDates.map(sessionDate => {
        const sessionData = {
          ...formData,
          date: sessionDate,
          // Remove repeat-specific fields from individual sessions
          isRepeating: undefined,
          repeatDays: undefined,
          repeatUntilDate: undefined,
        };
        return uploadSessionAction(sessionData);
      });

      await Promise.all(sessionPromises);

      console.log(`Created ${sessionDates.length} sessions`);
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to create session(s). Please try again.";
      
      setErrors({ submit: errorMessage });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, generateSessionDates]);

  const selectedSubject = useMemo(() => 
    subjectList.find(s => s.id === formData.subjectId),
    [subjectList, formData.subjectId]
  );

  const selectedGroup = useMemo(() => group, [group]);

  const minDateTime = useMemo(() => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return now.toISOString().slice(0, 16);
  }, []);

  const minRepeatUntilDate = useMemo(() => {
    if (!formData.date) return minDateTime;
    const minDate = new Date(formData.date);
    minDate.setDate(minDate.getDate() + 1);
    return minDate.toISOString().slice(0, 10);
  }, [formData.date, minDateTime]);

  const durationDisplay = useMemo(() => 
    `${Math.floor(formData.duration / 60)}h ${formData.duration % 60}m`,
    [formData.duration]
  );

  const characterCounts = useMemo(() => ({
    title: `${formData.title.length}/100 characters`,
    description: `${formData.description.length}/500 characters`,
  }), [formData.title.length, formData.description.length]);

  const isFormReady = useMemo(() => {
    return subjectList.length > 0 && !!formData.groupId;
  }, [subjectList, formData.groupId]);

  const sessionPreview = useMemo(() => {
    const dates = generateSessionDates();
    return {
      totalSessions: dates.length,
      dates: dates.slice(0, 5), // Show first 5 dates as preview
      hasMore: dates.length > 5
    };
  }, [generateSessionDates]);

  return {
    formData,
    errors,
    isSubmitting,
    isLoading,
    subjectList,
    group,
    selectedSubject,
    selectedGroup,
    minDateTime,
    minRepeatUntilDate,
    durationDisplay,
    characterCounts,
    isFormReady,
    sessionPreview,
    DAYS_OF_WEEK,
    updateFormField,
    toggleRepeatDay,
    setFormData,
    submitForm,
    resetForm,
    validateForm,
  };
}