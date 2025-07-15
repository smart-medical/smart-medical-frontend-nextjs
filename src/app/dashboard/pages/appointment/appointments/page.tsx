// app/dashboard/appointments/page.tsx
"use client"

import { FC } from 'react'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { enUS } from 'date-fns/locale/en-US'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent {
  title: string
  start: Date
  end: Date
  allDay?: boolean
}

const AppointmentsPage: FC = () => {
  const events: CalendarEvent[] = [
    {
      title: 'Appointment',
      start: new Date(2024, 4, 1),
      end: new Date(2024, 4, 1),
    },
    {
      title: 'Appointment',
      start: new Date(2024, 4, 1),
      end: new Date(2024, 4, 1),
    },
    {
      title: 'Appointment',
      start: new Date(2024, 4, 2),
      end: new Date(2024, 4, 2),
    },
    {
      title: 'Appointment',
      start: new Date(2024, 4, 2),
      end: new Date(2024, 4, 2),
    },
    {
      title: 'Appointment',
      start: new Date(2024, 4, 2),
      end: new Date(2024, 4, 2),
    },
  ]

  const CustomEvent = () => null
  const CustomDateCellWrapper = ({ value }: { value: Date }) => {
  const date = value instanceof Date ? value : new Date(value)

  const dateEvents = events.filter(
    (e) =>
      e.start.toDateString() === date.toDateString() ||
      e.end.toDateString() === date.toDateString()
  )

  return (
    <div className="text-sm text-blue-600 font-medium">
      {dateEvents.length > 0 && `${dateEvents.length} Appointments`}
    </div>
  )
}

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
      <div className="bg-white rounded shadow p-4">
        <Calendar
          defaultView={Views.MONTH}
          events={events}
          localizer={localizer}
          views={[Views.MONTH, Views.WEEK, Views.DAY]}
          selectable
          style={{ height: '80vh' }}
          components={{
            event: CustomEvent,
            month: {
              dateHeader: CustomDateCellWrapper,
            },
          }}
        />
      </div>
    </div>
  )
}

export default AppointmentsPage
