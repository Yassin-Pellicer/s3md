import { getCoursesAction, getSessionsAction, getSubjectsAction } from "@/app/server/management.action";
import { Course } from "@/app/types/Course";
import { Session } from "@/app/types/Session";
import { Subject } from "@/app/types/Subject";
import { useEffect, useState } from "react";

export function hooks() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [openCreateSessionModal, setOpenCreateSessionModal] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setSessions(await getSessionsAction());
  }

  return {
    sessions,
    setSessions,
    openCreateSessionModal,
    setOpenCreateSessionModal
  };
}
