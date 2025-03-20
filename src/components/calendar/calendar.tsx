import { useEffect, useState } from 'react';
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react';
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar';
import { createEventsServicePlugin } from '@schedule-x/events-service';
import styles from "./style.module.css";
import '@schedule-x/theme-default/dist/calendar.css';
import { createEventModalPlugin } from '@schedule-x/event-modal'
import { createDragAndDropPlugin } from '@schedule-x/drag-and-drop'
import { create } from 'domain';

function CalendarApp() {
  const [eventsService] = useState(() => createEventsServicePlugin());

  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '09-03-2025',
        end: '09-03-2025',
      },
    ],
    plugins: [eventsService,createEventModalPlugin(),createDragAndDropPlugin()],
  });

  useEffect(() => {
    // Fetch all events
    eventsService.getAll();
  }, [eventsService]);

  return (
    <div className={styles["calendar-container"]}>
      {calendar && <ScheduleXCalendar calendarApp={calendar} />}
    </div>
  );
}

export default CalendarApp;
