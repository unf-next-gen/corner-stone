"use client";

import { getUserProfile } from "@/app/auth/actions";
import { Avatar, Center, Stack, Tooltip, UnstyledButton } from "@mantine/core";
import { useSignal, useSignals } from "@preact/signals-react/runtime";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { AppConfig } from "../config/config";
import { NavbarLinkProps } from "../types";

function NavbarLink({ icon: Icon, label, href, active }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        component={Link}
        href={href}
        className="navbar-link"
        data-active={active || undefined}
      >
        <Icon size={20} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

export function Navbar() {
  useSignals();
  const userInitialsSignal = useSignal<string | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const fetchProfile = async () => {
      getUserProfile().then((profile) => {
        userInitialsSignal.value = profile?.initials;
      });
    };
    fetchProfile();
  }, []);

  const links = AppConfig.navbar.map((link) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={
        pathname === link.href ||
        (link.href !== "/" && pathname.startsWith(link.href))
      }
    />
  ));

  return (
    <nav className="navbar">
      <Center>
        <div className="navbar-logo">Corner Stone</div>
      </Center>
      <div className="navbar-main">
        <Stack justify="center" gap={0}>
          {links}
        </Stack>
      </div>
      {userInitialsSignal.value && (
        <Stack justify="center" gap={0}>
          <Tooltip
            label="Profile"
            position="right"
            transitionProps={{ duration: 0 }}
          >
            <UnstyledButton className="navbar-link navbar-user-initials">
              <Avatar size={32} radius="md">
                {userInitialsSignal.value}
              </Avatar>
            </UnstyledButton>
          </Tooltip>
        </Stack>
      )}
    </nav>
  );
}
