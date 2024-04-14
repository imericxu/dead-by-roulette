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
