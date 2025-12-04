import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "blue",
  defaultRadius: "md",

  // Color palette with better contrast
  colors: {
    blue: [
      "#e7f5ff",
      "#d0ebff",
      "#a5d8ff",
      "#74c0fc",
      "#4dabf7",
      "#339af0",
      "#228be6",
      "#1c7ed6",
      "#1971c2",
      "#1864ab",
    ],
    gray: [
      "#f8f9fa",
      "#e9ecef",
      "#dee2e6",
      "#ced4da",
      "#adb5bd",
      "#868e96",
      "#495057",
      "#343a40",
      "#212529",
      "#0c0e16",
    ],
  },

  white: "#ffffff",
  black: "#0c0e16",

  // Better contrast for text
  fontFamily:
    "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",

  headings: {
    fontFamily:
      "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
    fontWeight: "600",
  },

  defaultGradient: {
    from: "#3b82f6",
    to: "#9333ea",
    deg: 135,
  },

  // CSS variables for better control
  other: {
    bodyBackground: "#f8f9fa",
    textColor: "#0c0e16",
  },
});
