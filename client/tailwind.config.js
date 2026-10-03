export default {
  darkMode: 'class', // <--- ADD THIS LINE
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        eco: {
          // ... your existing colors ...
          50: '#f1f8e9',
          500: '#2E7D32',
          600: '#1B5E20',
          // Add the rest if missing
        }
      }
    },
  },
  plugins: [],
}