"use client";

import Link from "next/link";
import { Button } from '@mantine/core';

export default function Home() {
  return (
    <div>
      <h1>This is a test</h1>
      <Link href="/cornerstone/account">
        <button style={{ padding: "10px", marginTop: "10px" }}>
          Go to Cornerstone Account
        </button>
      </Link>
    </div>
  );
}