import { IconCalendarStats, IconClipboardList, IconHome2, IconSettings, IconUsers } from "@tabler/icons-react";


export const AppConfig = {
  navbar: [
      { icon: IconHome2, label: "Home", href: "/" },
      { icon: IconCalendarStats, label: "Events", href: "/events" },
      { icon: IconUsers, label: "Volunteers", href: "/volunteers" },
      { icon: IconClipboardList, label: "Register", href: "/registration" }, 
      { icon: IconSettings, label: "Settings", href: "/settings" },
    ],
} as const;


