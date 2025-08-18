import React from "react";
import { hooks } from "./hook";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";


export function SessionList() {
  const sessionHooks = hooks();

  return (
    <div className="">
      <div className="4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          selectable={true}
          editable={true}
          height="auto"
          events={sessionHooks.sessions}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          eventDisplay="block"
        />
      </div>
    </div>
  );
}
