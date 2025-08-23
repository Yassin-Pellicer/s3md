import { useCourseStore } from "@/app/contexts/course.store";
import { getGroupByCourseAction, getGroupsAction } from "@/app/server/management.action";
import { Group } from "@/app/types/Group";
import { useEffect, useState } from "react";


export function hooks() {
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);
  
  const selectedCourse = useCourseStore((state) => state.selectedCourse);
  useEffect(() => {
    console.log(selectedCourse?.id);
    setSelectedGroup(undefined);
  }, [selectedCourse?.id]);

  return {
    openCreateGroupModal,
    selectedGroup,
    setSelectedGroup,
    setOpenCreateGroupModal
  };
}
