import { Group } from "@/app/types/Group";
import { useEffect, useState } from "react";

export function hooks({ groups }: { groups?: Group[] | null }) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [sanitizedSessions, setSanitizedSessions] = useState<any[]>([]);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [selectedGroup, setSelectedGroup] = useState<any>(null);

  const handleClick = (initialDateTime: Date | null) => {
    setSelectedSession(null);
    setOpenCreateModal(true);
    setSelectedDateTime(initialDateTime ? new Date(initialDateTime) : new Date());
    if (groups?.length === 1) {
      setSelectedGroup(groups[0]);
    }
  };

  const handleEdit = (data: any) => {
    setOpenCreateModal(true);
    console.log(data.event.extendedProps.session)
    setSelectedSession(data.event.extendedProps.session);
    setSelectedGroup(groups?.find((g) => g.id === data.event.extendedProps.session.groupId));
  };

  useEffect(() => {
    if (!groups) return;

    const allSessions = groups.flatMap((group) => {
      if (!group?.sessions) return [];

      return group.sessions.map((session) => {
        const startDate = session.date ? new Date(session.date) : new Date();
        const endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + (session.duration || 60));

        return {
          id: session.id?.toString() || Math.random().toString(),
          title: session.subject?.title || "Subject",
          start: startDate,
          end: endDate,
          backgroundColor: session.subject?.color || "#FFFFFF",
          allDay: false,
          session,
        };
      });
    });

    setSanitizedSessions(allSessions);
  }, [groups]);

  useEffect(() => {
    console.log("sanitizedSessions", sanitizedSessions);
  }, [sanitizedSessions])

  return {
    sanitizedSessions,
    openCreateModal,
    selectedGroup,
    setOpenCreateModal,
    selectedDateTime,
    setSelectedDateTime,
    handleClick,
    handleEdit,
    selectedSession,
    setSelectedSession,
  };
}
