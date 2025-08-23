import { Group } from "@/app/types/Group";
import { useEffect, useState } from "react";

export function hooks({ group }: { group?: Group | null }) {
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [sanitizedSessions, setSanitizedSessions] = useState<any[]>([]);

  const handleClick = (initialDateTime: Date | null) => {
    setOpenCreateModal(true);
    setSelectedDateTime(initialDateTime ? new Date(initialDateTime) : new Date());
  };

  useEffect(() => {
    if (group?.sessions) {
      const formattedSessions = group.sessions.map((session) => {
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
      setSanitizedSessions(formattedSessions);
    } else {
      setSanitizedSessions([]);
    }
  }, [group?.sessions]);

  return {
    sanitizedSessions,
    openCreateModal,
    setOpenCreateModal,
    selectedDateTime,
    setSelectedDateTime,
    handleClick,
  };
}
