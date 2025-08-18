import { getGroupsAction } from "@/app/server/management.action";
import { Group } from "@/app/types/Group";
import { useEffect, useState } from "react";

export function hooks() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [openCreateGroupModal, setOpenCreateGroupModal] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    setGroups(await getGroupsAction());
  };

  return {
    groups,
    setGroups,
    openCreateGroupModal,
    setOpenCreateGroupModal
  };
}
