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
        primary: "#171717", // Dark gray primary color
        secondary: "#5C74DA", // Blue secondary color
        background: "#222222", // Dark background color
        foreground: "#C5C5CD", // Light gray foreground color
        accent: "#7890DF", // Light blue accent color
        error: "#4C5454", // Grayish-green error color
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

// color pallete 1
// primary: "#171717", // Dark gray primary color
//         secondary: "#5C74DA", // Blue secondary color
//         background: "#222222", // Dark background color
//         foreground: "#C5C5CD", // Light gray foreground color
//         accent: "#7890DF", // Light blue accent color
//         error: "#4C5454", // Grayish-green error color
