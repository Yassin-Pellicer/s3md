import { getCoursesAction, getSessionsAction, getSubjectsAction } from "@/app/server/management.action";
import { Course } from "@/app/types/Course";
import { Session } from "@/app/types/Session";
import { Subject } from "@/app/types/Subject";
import { useEffect, useState } from "react";

export function hooks() {
  const [openCreateSessionModal, setOpenCreateSessionModal] = useState(false);

  return {
    openCreateSessionModal,
    setOpenCreateSessionModal
  };
}
