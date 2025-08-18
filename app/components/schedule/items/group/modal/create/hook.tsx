import { useEffect, useState } from "react";
import { uploadGroupAction } from "@/app/server/management.action";
import { Group } from "@/app/types/Group";
import { useCourseStore } from "@/app/contexts/course.store";

export function hooks() {

  const courseStore = useCourseStore();
  const [formData, setFormData] = useState<Group>({
    title: "",
    description: "",
    courseId: courseStore.selectedCourse?.id,
    capacity: 0,
  });
  
  useEffect(() => {
    if (courseStore.selectedCourse?.id) {
      setFormData(prev => ({ ...prev, courseId: courseStore.selectedCourse!.id }));
    }
  }, [courseStore.selectedCourse]);

  const uploadContent = async () => {
    if (!formData.courseId) {
      throw new Error("No course selected. Please select a course before creating a group.");
    }
    await uploadGroupAction(formData);
  };

  const handleConfirm = () => {
  };

  const handleClose = () => {
  };

  return {
    formData,
    uploadContent,
    setFormData,
    handleConfirm,
    handleClose,
  };
}
