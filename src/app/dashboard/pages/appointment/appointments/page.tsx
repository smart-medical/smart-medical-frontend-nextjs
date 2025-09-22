"use client"

import { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

export default function AppointmentCalendar() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [events, setEvents] = useState([
    {
      id: "1",
      title: "John Doe - Dr. Smith",
      start: "2025-09-22T10:00:00",
      end: "2025-09-22T10:30:00",
    },
    {
      id: "2",
      title: "Jane Roe - Dr. Jones",
      start: "2025-09-23T11:00:00",
      end: "2025-09-23T11:30:00",
    },
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateClick = (info: any) => {
    alert("Clicked on date: " + info.dateStr)
    // 👉 here you can open your "Book Appointment" form
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
        dateClick={handleDateClick}
        selectable={true}
        height="80vh"
      />
    </div>
  )
}
