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
    extend: {
      colors: {
        focus: "#ca8a04b3",
      },
    },
  },
  plugins: [
    require("tailwind-gradient-mask-image"),
    require("tailwindcss-react-aria-components"),
  ],
};
export default config;
