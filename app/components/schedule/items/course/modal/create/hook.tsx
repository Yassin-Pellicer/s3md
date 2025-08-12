import { useEffect, useState } from "react";
import { getCoursesAction, getSubjectsAction, uploadCoursesAction, uploadSubjectAction } from "@/app/server/management.action";
import { Course } from "@/app/types/Course";
import { Subject } from "@/app/types/Subject";

export function hooks() {

  const [formData, setFormData] = useState<Course>({
    title: "",
    description: "",
    startsAt: undefined,
    endsAt: undefined,
    inscriptionStart: undefined,
    inscriptionEnd: undefined,
    price: undefined,
    duration: undefined,
    subjects: [],
    groups: [],
  });

  const [subjectList, setSubjectList] = useState<Subject[]>([]);

  const uploadContent = async () => {
    await uploadCoursesAction(formData);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    const subjects = await getSubjectsAction();
    setSubjectList(subjects);
  }

  return {
    formData,
    subjectList,
    uploadContent,
    setFormData,
  };
}
