import { createTheme } from "@mantine/core";

export const theme = createTheme({
  primaryColor: "grapeSoda",
  defaultRadius: "md",

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
    grapeSoda: [
      "#fdeffd",
      "#f1dff0",
      "#debcdc",
      "#cb98c8",
      "#bb79b7",
      "#b165ac",
      "#ad5ba8",
      "#9a4c95", // base color
      "#884184",
      "#783674",
    ],
    blackberryCream: [
      "#f7f2f8",
      "#e9e2eb",
      "#d4c1d7",
      "#be9ec3",
      "#ab80b1",
      "#a06da7",
      "#9a63a3",
      "#86538e",
      "#78497f",
      "#4d2d52", // base color
    ],
    lilacAsh: [
      "#f0e2e4",
      "#d8c4c7",
      "#c1a5a9", // base color
      "#ac888d",
      "#a0777c",
      "#9b6d74",
      "#875c62",
      "#7a5157",
      "#6e434a",
      "#5a363c",
    ],
    midnightViolet: [
      "#f2f2f8",
      "#e2e1ea",
      "#c2bfd5",
      "#a09bc1",
      "#847db0",
      "#7269a6",
      "#6960a2",
      "#59508e",
      "#4f4680",
      "#1d1a31", // base color
    ],
  },

  white: "#ffffff",
  black: "#0c0e16",

  fontFamily:
    "'Kumbh Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",

  headings: {
    fontFamily:
      "'Kumbh Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif",
    fontWeight: "600",
  },

  defaultGradient: {
    from: "#3b82f6",
    to: "#9333ea",
    deg: 135,
  },

  other: {
    bodyBackground: "#f8f9fa",
    textColor: "#0c0e16",
  },
});
