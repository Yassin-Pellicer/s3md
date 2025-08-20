import { getSubjectsAction } from "@/app/server/management.action";
import { Subject } from "@/app/types/Subject";
import { useEffect, useState } from "react";

export function hooks(subjectsProp?: Subject[]) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [openCreateSubjectModal, setOpenCreateSubjectModal] = useState(false);

  const fetchContent = async () => {
    const data = await getSubjectsAction();
    setSubjects(data);
  };

  useEffect(() => {
    if (subjectsProp && subjectsProp.length > 0) {
      setSubjects(subjectsProp);
    } else {
      fetchContent();
    }
  }, [subjectsProp]); 

  return {
    subjects,
    openCreateSubjectModal,
    setOpenCreateSubjectModal,
  };
}
