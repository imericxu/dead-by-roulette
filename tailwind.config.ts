import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/variants/**/*.ts",
  ],
  theme: {
    extend: {
      colors: {
        focus: "#ca8a04b3",
        main: {
          DEFAULT: "rgba(255, 255, 255, 0.95)",
          light: "rgba(255, 255, 255, 0.25)",
          medium: "rgba(255, 255, 255, 0.5)",
          heavy: "rgba(255, 255, 255, 0.75)",
          heaviest: "rgba(255, 255, 255, 0.95)",
        },
        overlay: {
          light: "rgba(255, 255, 255, 0.05)",
          DEFAULT: "rgba(255, 255, 255, 0.1)",
        },
      },
      margin: {
        page: "16px",
        "page-sm": "32px",
        "page-lg": "calc((100% - var(--page-width-lg)) / 2)",
      },
      padding: {
        page: "16px",
        "page-sm": "32px",
      },
    },
  },
  plugins: [
    require("tailwind-gradient-mask-image"),
    require("tailwindcss-react-aria-components"),
  ],
};
export default config;
