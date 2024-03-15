import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/variants/**/*.ts",
  ],
  theme: {
    data: {
      pressed: "pressed",
      hovered: "hovered",
      disabled: "disabled",
      "focus-visible": "focus-visible",
    },
    extend: {
      colors: {
        focus: "#ca8a04b3",
      },
    },
  },
  plugins: [require("tailwind-gradient-mask-image")],
};
export default config;
