import { getCoursesAction, getSubjectsAction } from "@/app/server/management.action";
import { Course } from "@/app/types/Course";
import { Subject } from "@/app/types/Subject";
import { useEffect, useState } from "react";

export function hooks() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [OpenCreateCourseModal, setOpenCreateCourseModal] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setCourses(await getCoursesAction(false, false));
  }

  return {
    courses,
    setCourses,
    OpenCreateCourseModal,
    setOpenCreateCourseModal
  };
}
