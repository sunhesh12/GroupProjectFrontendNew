"use client";

import { useEffect, useState } from "react";
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
  // hooks
  const eventsService = createEventsServicePlugin();
  const calendar = useCalendarApp({
    views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
    plugins: [eventsService, createEventModalPlugin(), createDragAndDropPlugin()],
  });

  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Load events from backend
  useEffect(() => {
    if (!userId || !token) return;

    (async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/v1/users/${userId}/events`, {
          headers: { Accept: "application/json", Authorization: `Bearer ${token}` },
          cache: "no-store",
        });

        const raw = await res.json();

        const arr =
          raw?.payload?.events ??
          (raw?.payload?.event ? [raw.payload.event] : Array.isArray(raw) ? raw : []);

        const formatted = arr.map((e: any) => ({
          id: String(e.id),
          title: e.event_name,
          start: `${e.start_date} ${(e.start_time ?? "00:00:00").slice(0, 5)}`, // "YYYY-MM-DD HH:mm"
          end: `${e.end_date || e.start_date} ${(e.end_time ?? "00:00:00").slice(0, 5)}`, // "YYYY-MM-DD HH:mm"
        }));

        calendar.events.set(formatted);
      } catch (err) {
        console.error("Error fetching user events:", err);
      }
    })();
  }, [userId, token, calendar]);

  // Add event handler
  const handleAddEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userId || !token) return;

    const form = e.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value.trim();
    const start = (form.elements.namedItem("start") as HTMLInputElement).value;
    const end = (form.elements.namedItem("end") as HTMLInputElement).value;
    const description = (form.elements.namedItem("description") as HTMLInputElement)?.value || "";

    if (!title || !start || !end) return;

    // Convert datetime-local → Laravel expects {date, time}
    const [startDate, startTime] = start.split("T");
    const [endDate, endTime] = end.split("T");

    setSubmitting(true);
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/v1/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          event_name: title,
          start_date: startDate,
          start_time: `${startTime}:00`,
          end_date: endDate,
          end_time: `${endTime}:00`,
          description,
          status: "scheduled",
          user_ids: [userId], // attach to logged user
        }),
      });

      if (!res.ok) {
        console.error("Failed to create event:", res.status);
        return;
      }

      const data = await res.json();

      // Add immediately to calendar (Schedule-X wants "YYYY-MM-DD HH:mm")
      calendar.events.add({
        id: String(data.event.id ?? Date.now()),
        title,
        start: start.replace("T", " "), // "2025-08-27 15:00"
        end: end.replace("T", " "),     // "2025-08-27 16:00"
      });

      setShowModal(false);
      form.reset();
    } catch (err) {
      console.error("Error creating event:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* header row */}
      <div className={styles.topBar}>
        <h2 className={styles.title}>Calendar</h2>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => setShowModal(true)}
        >
          <span className={styles.plusIcon}>＋</span>
          Add Event
        </button>
      </div>

      {/* calendar itself */}
      <div className={styles.calendarWrap}>
        <ScheduleXCalendar calendarApp={calendar} />
      </div>

      {/* modal popup */}
      {showModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>Add New Event</h3>
              <button className={styles.closeBtn} onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEvent} className={styles.form}>
              <label className={styles.label}>
                Title
                <input name="title" type="text" className={styles.input} required />
              </label>

              <label className={styles.label}>
                Description
                <textarea name="description" className={styles.input} rows={2}></textarea>
              </label>

              <div className={styles.row}>
                <label className={styles.label}>
                  Start
                  <input name="start" type="datetime-local" className={styles.input} required />
                </label>
                <label className={styles.label}>
                  End
                  <input name="end" type="datetime-local" className={styles.input} required />
                </label>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className={styles.primaryBtn} disabled={submitting}>
                  {submitting ? "Saving…" : "Save Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
