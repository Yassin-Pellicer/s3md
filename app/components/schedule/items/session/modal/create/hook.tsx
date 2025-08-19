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

export function useSessionForm({ group }: { group?: Group | null }) {
  const [formData, setFormData] = useState<SessionFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subjectList, setSubjectList] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const courseStore = useCourseStore();

  // Initialize data on mount or when group changes
  useEffect(() => {
    initializeData();
    console.log("group changed");
    setFormData(prev => ({ ...prev, groupId: group?.id || "" }));
  }, [group, courseStore.selectedCourse]);

  useEffect(() => {
    
  })

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
    });
    setErrors({});
    setIsSubmitting(false);
  }, [group]);

  const updateFormField = useCallback(
    <K extends keyof SessionFormData>(field: K, value: SessionFormData[K]) => {
      setFormData(prev => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

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

    console.log("submitForm", formData);

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
    durationDisplay,
    characterCounts,
    isFormReady,
    updateFormField,
    submitForm,
    resetForm,
    validateForm,
  };
}