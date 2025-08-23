import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Group } from "@/app/types/Group";
import CreateSessionModal from "../modal/create";
import { hooks } from "./hook";

export function SessionList({ group }: { group: Group | null }) {
  const calendarHooks = hooks({ group });
  return (
    <div className="">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        events={calendarHooks.sanitizedSessions}
        slotMinTime="08:00:00"
        slotMaxTime="23:00:00"
        expandRows={true}
        height={"auto"}
        slotDuration="00:30:00"
        timeZone="local"
        headerToolbar={{
          left: "prev,next today",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventDisplay="block"
        selectConstraint={{
          start: new Date().toISOString().split("T")[0] + "T00:00:00",
        }}
        dateClick={(info) => calendarHooks.handleClick(info.date)}
        select={(info) => calendarHooks.handleClick(info.start)}
        eventContent={(arg) => {
          const { event } = arg;
          const session = (event.extendedProps as any).session || (event as any).session;
          return (
            <div
              className="px-1 py-0.5 flex flex-col items-stretch gap-1 justify-start h-full overflow-y-auto"
              style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.4)" }}
            >
              <strong
                className="text-xs font-bold truncate"
                title={session.subject?.title}
              >
                {session.subject?.title}
              </strong>

              {session.subject?.description && (
                <span
                  className="text-[10px] text-ellipsis line-clamp-2"
                  title={session.subject?.description}
                >
                  {group?.title && `${group.title}: `}
                  {session.subject?.description}
                </span>
              )}
              <span className="text-[8px] text-white">
                ⏱️ {session.duration}' min.
              </span>
            </div>
          );
        }}

      />
      <CreateSessionModal
        open={calendarHooks.openCreateModal}
        setOpen={calendarHooks.setOpenCreateModal}
        group={group}
        initialDateTime={calendarHooks.selectedDateTime}
      />
    </div>
  );
}
