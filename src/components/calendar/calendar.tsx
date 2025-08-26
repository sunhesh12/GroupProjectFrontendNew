"use client";

import { useEffect } from "react";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewWeek,
  createViewMonthGrid,
  createViewMonthAgenda,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import styles from "./style.module.css";
import "@schedule-x/theme-default/dist/calendar.css";

type Props = {
  userId: number;
  token: string;
};

export default function CalendarClient({ userId, token }: Props) {
  // ✅ call hooks directly
  const eventsService = createEventsServicePlugin();
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    plugins: [eventsService, createEventModalPlugin(), createDragAndDropPlugin()],
  });

  useEffect(() => {
    if (!userId || !token) return;

    (async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${userId}/events`, {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          cache: "no-store",
        });

        const raw = await res.json();
        console.log("Raw events response:", raw);

        const arr =
          raw?.payload?.events ??
          (raw?.payload?.event ? [raw.payload.event] : Array.isArray(raw) ? raw : []);

        const formatted = arr.map((e: any) => ({
          id: String(e.id),
          title: e.event_name,
          start: `${e.start_date} ${(e.start_time ?? "00:00:00").slice(0, 5)}`,
          end: `${e.end_date || e.start_date} ${(e.end_time ?? "00:00:00").slice(0, 5)}`,
        }));

        console.log("Formatted events:", formatted);
        calendar.events.set(formatted);
      } catch (err) {
        console.error("Error fetching user events:", err);
      }
    })();
  }, [userId, token, calendar]);

  return (
    <div className={styles["calendar-container"]}>
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  );
}
