"use client";

import { useEffect, useState } from "react";
import LoginUser from "./src/goo-goo-gaga/test";
import { Button, TextInput } from "@mantine/core";

export default function Home() {
  const [res, setResponse] = useState("");
  const onSubmit = async (formData: FormData) => {
    const response = await LoginUser(formData)
    setResponse(response?.id || "change me")
  }

  return (
    <form action={onSubmit}>
      <Button
        variant="filled"
        size="xl"
        type="submit"
      >
        Submit
      </Button>
      <TextInput className="max-w-lg" name="username" placeholder="User Name"></TextInput>
      <TextInput className="max-w-lg" name="password" placeholder="Password" type="password"></TextInput>
      <div className="w-md h-10 bg-slate-200">{res}</div>
    </form>
  );
}
