import { getSubjectsAction } from "@/app/server/management.action";
import { Subject } from "@/app/types/Subject";
import { useEffect, useState } from "react";

export function hooks () {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  return {
    subjects
  };
}
