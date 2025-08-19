import { useCourseStore } from "@/app/contexts/course.store";
import { getGroupByCourseAction, getGroupsAction } from "@/app/server/management.action";
import { Group } from "@/app/types/Group";
import { useEffect, useState } from "react";

export function hooks() {
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);

  useEffect(() => {
   setSelectedGroup(undefined); 
  }, [useCourseStore.getState().selectedCourse]);

  return {
    openCreateGroupModal,
    selectedGroup,
    setSelectedGroup,
    setOpenCreateGroupModal
  };
}
