import { useState } from "react";
import { Subject } from "@/app/types/Subject";
import { uploadSubjectAction } from "@/app/server/management.action";

export function hooks() {

  const [formData, setFormData] = useState<Subject>({
    topic: "",
    title: "",
    description: "",
    color: "#000000",
    materialRoute: "",
  });

  const uploadContent = async () => {
    await uploadSubjectAction(formData);
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
