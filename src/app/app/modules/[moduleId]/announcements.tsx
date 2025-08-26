import Panel from "@/components/panel/view";
import { faBell } from "@fortawesome/free-regular-svg-icons";

export default function Announcements() {
  return (
    <Panel header="Announcements" icon={faBell}>
      <p>Panel Content</p>
    </Panel>
  );
}
