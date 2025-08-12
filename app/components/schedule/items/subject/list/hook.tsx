import { getSubjectsAction } from "@/app/server/management.action";
import { Subject } from "@/app/types/Subject";
import { useEffect, useState } from "react";

export function hooks() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [openCreateSubjectModal, setOpenCreateSubjectModal] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setSubjects(await getSubjectsAction());
  };

  return {
    subjects,
    openCreateSubjectModal,
    setOpenCreateSubjectModal
  };
}
