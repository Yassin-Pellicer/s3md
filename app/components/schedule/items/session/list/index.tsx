import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Popover, Typography, IconButton, Box, Divider } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import { Group } from "@/app/types/Group";

export function SessionList({ group }: { group?: Group | null }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleEventClick = (clickInfo: any) => {
    setAnchorEl(clickInfo.el); // anchor popover to the event element
    setSelectedEvent(clickInfo.event);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedEvent(null);
  };

  return (
    <div className="rounded-xl shadow-md p-2 bg-white">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        editable={true}
        events={group?.sessions}
        height="auto"
        slotMinTime="08:00:00"
        slotMaxTime="23:00:00"
        expandRows={true}
        slotDuration="00:30:00"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventDisplay="block"
        eventClick={handleEventClick}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {selectedEvent && (
          <Box p={2} sx={{ minWidth: 280, maxWidth: 350 }}>
            {/* Header with actions */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="subtitle1" fontWeight="bold">
                {selectedEvent.title}
              </Typography>
              <Box>
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <EmailIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Event details */}
            <Typography variant="body2" color="text.secondary">
              {selectedEvent.start?.toLocaleString()} –{" "}
              {selectedEvent.end?.toLocaleString() || ""}
            </Typography>
            {selectedEvent.extendedProps?.description && (
              <Typography variant="body2" mt={1}>
                {selectedEvent.extendedProps.description}
              </Typography>
            )}

            {selectedEvent.extendedProps?.owner && (
              <Typography variant="caption" display="block" mt={1} color="text.secondary">
                Created by: {selectedEvent.extendedProps.owner}
              </Typography>
            )}
          </Box>
        )}
      </Popover>
    </div>
  );
}
