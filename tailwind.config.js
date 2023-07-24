/** @type {import('tailwindcss').Config} */

// module.exports = {
//   content: ["./src/**/*.{js,jsx,ts,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         primary: "#0E141B", // Dark blue primary color
//         secondary: "#FACF32", // Yellow secondary color
//         background: "#1E2731", // Dark gray background color
//         foreground: "#D9DDE1", // Light gray foreground color
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class", // Enable dark mode based on the class "dark" on the body element
  theme: {
    extend: {
      colors: {
        primary: "#111827", // Dark gray primary color
        secondary: "#3B82F6", // Blue secondary color
        background: "#1F2937", // Dark blue background color
        foreground: "#E5E7EB", // Light gray foreground color
        accent: "#10B981", // Green accent color
        error: "#EF4444", // Red error color
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"], // Change the default font family to Roboto
      },
      boxShadow: {
        gaming: "0 0 20px rgba(0, 0, 0, 0.5)", // Custom gaming-inspired box shadow
      },
    },
  },
  variants: {},
  plugins: [],
};
