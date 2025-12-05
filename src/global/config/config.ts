import { IconCalendarStats, IconHome2, IconSettings, IconUsers } from "@tabler/icons-react";

export const AppConfig = {
  navbar: [
      { icon: IconHome2, label: "Home", href: "/" },
      { icon: IconCalendarStats, label: "Events", href: "/events" },
      { icon: IconUsers, label: "Volunteers", href: "/volunteers" },
      { icon: IconSettings, label: "Settings", href: "/settings" },
    ],
} as const;


