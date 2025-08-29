import Panel from "@/components/panel/view";
import { Announcement } from "@/utils/types/backend";
import { faBell } from "@fortawesome/free-regular-svg-icons";

interface AnnouncementsProps {
  announcements: Announcement[];
}

export default function Announcements({ announcements }: AnnouncementsProps) {
  return (
    <Panel header="Announcements" icon={faBell}>
      {announcements.length === 0 ? (
        <p>No announcements available.</p>
      ) : (
        <ul>
          {announcements.map(
            (announcement, index) =>
              announcement.is_visible && (
                <li key={index} style={{ marginBottom: "1rem" }}>
                  <h3>{announcement.topic}</h3>
                  <p>{announcement.description}</p>
                </li>
              )
          )}
        </ul>
      )}
    </Panel>
  );
}
