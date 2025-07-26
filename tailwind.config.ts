import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx,jsx,js}",
    "./src/components/**/*.{ts,tsx,jsx,js}",
  ],
  theme: {
    extend: {
      colors: {
        "muted-foreground": "#6b7280",
      },
    },
  },
  plugins: [],
}
export default config